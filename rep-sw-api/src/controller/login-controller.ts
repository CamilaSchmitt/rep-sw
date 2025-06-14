import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Usuario from "../entities/usuario-entity";
import bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { addToBlacklist } from "../services/blacklist";
import { refreshTokens, removeRefreshToken } from "../services/refreshTokens";

dotenv.config();

export class LoginController {
    private usuarioRepository: Repository<Usuario>;

    constructor() {
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
    }

    public doLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email, senha } = req.body;

        if (!email || !senha) {
            res.status(400).json({ message: "E-mail e senha são obrigatórios." });
            return;
        }

        try {
            const usuario = await this.usuarioRepository.findOne({ where: { email } });

            if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
                res.status(401).json({ message: "Credenciais inválidas." });
                return;
            }

            if (!process.env.TOKEN_KEY || !process.env.REFRESH_TOKEN_KEY) {
                res.status(500).json({ message: "Chaves JWT não configuradas." });
                return;
            }

            // Gerar o Access Token com validade curta (15 minutos)
            const accessToken = jwt.sign(
                { auth: true, id: usuario.id, email: usuario.email },
                process.env.TOKEN_KEY!,
                { expiresIn: "15m" }
            );

            // Gerar o Refresh Token com validade longa (7 dias)
            const refreshToken = jwt.sign(
                { auth: true, id: usuario.id, email: usuario.email },
                process.env.REFRESH_TOKEN_KEY!,
                { expiresIn: "2h" }
            );

            // Armazenar o Refresh Token (em memória ou banco de dados, ou Redis)
            refreshTokens.push(refreshToken);  // Exemplo usando memória

            res.status(200).json({
                accessToken,
                refreshToken,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                },
            });
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    };


    public register: RequestHandler = async (req, res): Promise<void> => {
        const { nome, email, senha, cpf, situacao, telefone, departamento, jornada } = req.body;

        if (!nome || !email || !senha) {
            res.status(400).json({
                message: "Nome, e-mail e senha são obrigatórios.",
            });
            return;
        }

        try {
            const usuarioExistente = await this.usuarioRepository.findOne({ where: { email } });

            if (usuarioExistente) {
                res.status(400).json({ message: "E-mail já cadastrado." });
                return;
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            const novoUsuario = this.usuarioRepository.create({
                nome,
                email,
                senha: senhaHash,
                cpf,
                situacao,
                telefone,
                idDepartamento: departamento, // se ainda for um relacionamento, senão: idDepartamento
                idJornada: jornada // <- jornada é um número vindo do req.body
            });

            await this.usuarioRepository.save(novoUsuario);

            res.status(201).json({ message: "Usuário cadastrado com sucesso." });
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    };

    public logout = (req: Request, res: Response) => {
        const accessToken = req.headers["authorization"]?.split(" ")[1];
        const { refreshToken } = req.body;

        if (accessToken) addToBlacklist(accessToken);
        if (refreshToken) removeRefreshToken(refreshToken);

        res.status(200).json({ message: "Logout realizado." });
    };


    public refresh: RequestHandler = async (req, res): Promise<void> => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            res.status(400).json({ message: "Refresh token é obrigatório." });
            return;
        }

        if (!process.env.REFRESH_TOKEN_KEY) {
            res.status(500).json({ message: "Chave de refresh token não configurada." });
            return;
        }

        if (!refreshTokens.includes(refreshToken)) {
            res.status(403).json({ message: "Refresh token inválido." });
            return;
        }

        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY) as jwt.JwtPayload;

            const newAccessToken = jwt.sign(
                { auth: true, id: payload.id, email: payload.email },
                process.env.TOKEN_KEY!,
                { expiresIn: "15m" }
            );

            res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            res.status(403).json({ message: "Refresh token inválido ou expirado." });
        }
    };


}