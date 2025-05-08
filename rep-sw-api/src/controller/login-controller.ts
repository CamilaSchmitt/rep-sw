import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Usuario from "../entities/usuario-entity";
import bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";

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
    
            if (!process.env.TOKEN_KEY) {
                res.status(500).json({ message: "Chave JWT não configurada." });
                return;
            }
    
            const token = jwt.sign(
                { auth: true, id: usuario.id, email: usuario.email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" }
            );
    
            res.status(200).json({
                token,
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
    
            const novoUsuario = this.usuarioRepository.create({ nome, email, senha: senhaHash, cpf, situacao, telefone, departamento, jornada });
    
            await this.usuarioRepository.save(novoUsuario);
    
            res.status(201).json({ message: "Usuário cadastrado com sucesso." });
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    };
    
}