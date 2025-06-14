import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../config/datasource';
import UsuarioEntity from '../entities/usuario-entity';
import axios from 'axios';

export class UsuarioController {
    private usuarioRepository: Repository<UsuarioEntity>;

    constructor() {
        this.usuarioRepository = AppDataSource.getRepository(UsuarioEntity);
    }

    private async buscarDepartamento(id: number) {
        try {
            const { data } = await axios.get(`http://localhost:3004/departamentos/${id}`);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao buscar departamento ${id}:`, error.message);
            } else {
                console.error(`Erro ao buscar departamento ${id}:`, error);
            }
            return null;
        }
    }

    private async buscarJornada(id: number) {
        try {
            const { data } = await axios.get(`http://localhost:3003/jornadas/${id}`);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao buscar jornada ${id}:`, error.message);
            } else {
                console.error(`Erro ao buscar jornada ${id}:`, error);
            }
            return null;
        }
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const usuarios = await this.usuarioRepository.find();

        const usuariosComInfo = await Promise.all(
            usuarios.map(async (usuario) => {
                const departamento = usuario.idDepartamento
                    ? await this.buscarDepartamento(usuario.idDepartamento)
                    : null;

                const jornada = usuario.idJornada
                    ? await this.buscarJornada(usuario.idJornada)
                    : null;

                return {
                    ...usuario,
                    departamento,
                    jornada,
                };
            })
        );

        res.status(200).json(usuariosComInfo);
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const usuarioId = parseInt(req.params.id);
        const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

        if (!usuario) {
            res.status(404).send('Usuário não encontrado');
            return;
        }

        const departamento = usuario.idDepartamento
            ? await this.buscarDepartamento(usuario.idDepartamento)
            : null;

        const jornada = usuario.idJornada
            ? await this.buscarJornada(usuario.idJornada)
            : null;

        res.status(200).json({
            ...usuario,
            departamento,
            jornada,
        });
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const newUsuario = this.usuarioRepository.create(req.body);

        try {
            await this.usuarioRepository.save(newUsuario);
            res.status(201).json(newUsuario);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).send('Erro ao criar usuário');
        }
    };

    replace = async (req: Request, res: Response): Promise<void> => {
        const usuarioId = parseInt(req.params.id);
        const existingUsuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

        if (!existingUsuario) {
            res.status(404).send('Usuário não encontrado');
            return;
        }

        const updateUsuario = this.usuarioRepository.create({
            ...existingUsuario,
            ...req.body,
        });

        await this.usuarioRepository.save(updateUsuario);
        res.status(200).json(updateUsuario);
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const usuarioId = parseInt(req.params.id);
        const partialUpdate = req.body;

        const result = await this.usuarioRepository.update(usuarioId, partialUpdate);

        if (result.affected === 0) {
            res.status(404).send('Usuário não encontrado');
        } else {
            const updatedUsuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
            res.status(200).json(updatedUsuario);
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const usuarioId = parseInt(req.params.id);
        const result = await this.usuarioRepository.delete(usuarioId);

        if (result.affected === 0) {
            res.status(404).send('Usuário não encontrado');
        } else {
            res.status(204).send();
        }
    };
}
