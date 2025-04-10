import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { datasource } from '../config/datasource';
import UsuarioEntity from '../entities/usuario-entity';

export class UsuarioController {

    private usuarioRepository: Repository<UsuarioEntity>;

    constructor() {
        this.usuarioRepository = datasource.getRepository(UsuarioEntity);
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const usuarios = await this.usuarioRepository.find({
            relations: ['departamento', 'jornada'],
        });
        res.status(200).json(usuarios);
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const usuario = await this.usuarioRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!usuario) {
            res.status(404).send('Usuário não encontrado');
        } else {
            res.status(200).json(usuario);
        }
    };

    create = async (req:Request, res: Response): Promise<void> => {
        const newUsuario = this.usuarioRepository.create(req.body);

        try{
            await this.usuarioRepository.save(newUsuario);
            res.status(201).json(newUsuario);
        }
        catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).send('Erro ao criar usuário' );
        }
    };

    replace = async (req: Request, res: Response): Promise<void> => {
        const usuarioId = parseInt(req.params.id);
        const existingUsuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

        if (!existingUsuario) {
            res.status(404).send('Usuário não encontrado');
        } else {
            const updateUsuario = this.usuarioRepository.create({ ...existingUsuario, ...req.body });
            await this.usuarioRepository.save(updateUsuario);
            res.status(200).json(updateUsuario);
        }
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

    delete = async (req:Request, res: Response): Promise<void> => {
        const result = await this.usuarioRepository.delete(req.params.id);
        if (result.affected === 0) {
            res.status(404).send('Usuário não encontrado');
        } else {
            res.status(204).send();
        }
    };

}