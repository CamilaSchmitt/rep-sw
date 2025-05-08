import {Request, Response} from 'express';
import {Repository} from 'typeorm';
import {AppDataSource} from '../config/datasource';
import JornadaEntity from '../entities/jornada-entity';

export class JornadaController {
    private jornadaRepository: Repository<JornadaEntity>;

    constructor() {
        this.jornadaRepository = AppDataSource.getRepository(JornadaEntity);
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const jornadas = await this.jornadaRepository.find();
        res.status(200).json(jornadas);
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const jornada = await this.jornadaRepository.findOneBy({id: parseInt(req.params.id)});
        if (!jornada) {
            res.status(404).send({ message: 'Jornada não encontrada' });
        }
        res.status(200).json(jornada);
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const newJornada = this.jornadaRepository.create(req.body);
        try{
            await this.jornadaRepository.save(newJornada);
            res.status(201).json(newJornada);
        }
        catch (error) {
            console.error('Erro ao criar jornada:', error);
            res.status(500).send('Erro ao criar jornada' );
        }
    };

    replace = async (req: Request, res: Response): Promise<void> => {
        const jornadaId = parseInt(req.params.id);
        const existingJornada = await this.jornadaRepository.findOneBy({id: jornadaId});

        if (!existingJornada) {
            res.status(404).send('Jornada não encontrada');
        }else {
            const updateJornada = this.jornadaRepository.create({ ...existingJornada, ...req.body });
            await this.jornadaRepository.save(updateJornada);
            res.status(200).json(updateJornada);
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const jornadaId = parseInt(req.params.id);
        const existingJornada = await this.jornadaRepository.findOneBy({id: jornadaId});

        if (!existingJornada) {
            res.status(404).send('Jornada não encontrada');
        }else {
            const updateJornada = this.jornadaRepository.create({ ...existingJornada, ...req.body });
            await this.jornadaRepository.save(updateJornada);
            res.status(200).json(updateJornada);
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const jornadaId = parseInt(req.params.id);
        const existingJornada = await this.jornadaRepository.findOneBy({id: jornadaId});

        if (!existingJornada) {
            res.status(404).send('Jornada não encontrada');
        }else {
            await this.jornadaRepository.delete(jornadaId);
            res.status(204).send();
        }
    };
}