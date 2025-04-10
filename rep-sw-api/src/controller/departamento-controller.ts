import { Request, Response } from "express";
import { Repository } from "typeorm";
import { datasource } from "../config/datasource";
import DepartamentoEntity from "../entities/departamento-entity";

export class DepartamentoController {
    private departamentoRepository: Repository<DepartamentoEntity>;

    constructor() {
        this.departamentoRepository = datasource.getRepository(DepartamentoEntity);
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const departamentos = await this.departamentoRepository.find();
        res.status(200).json(departamentos);
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const departamento = await this.departamentoRepository.findOneBy({id: parseInt(req.params.id)});
        if (!departamento) {
            res.status(404).send({ message: 'Departamento não encontrado' });
        }
        res.status(200).json(departamento);
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const newDepartamento = this.departamentoRepository.create(req.body);
        try{
            await this.departamentoRepository.save(newDepartamento);
            res.status(201).json(newDepartamento);
        }
        catch (error) {
            console.error('Erro ao criar departamento:', error);
            res.status(500).send('Erro ao criar departamento' );
        }
    };

    replace = async (req: Request, res: Response): Promise<void> => {
        const departamentoId = parseInt(req.params.id);
        const existingDepartamento = await this.departamentoRepository.findOneBy({id: departamentoId});

        if (!existingDepartamento) {
            res.status(404).send('Departamento não encontrado');
        }else {
            const updateDepartamento = this.departamentoRepository.create({ ...existingDepartamento, ...req.body });
            await this.departamentoRepository.save(updateDepartamento);
            res.status(200).json(updateDepartamento);
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const departamentoId = parseInt(req.params.id);
        const existingDepartamento = await this.departamentoRepository.findOneBy({id: departamentoId});

        if (!existingDepartamento) {
            res.status(404).send('Departamento não encontrado');
        }else {
            const updateDepartamento = this.departamentoRepository.create({ ...existingDepartamento, ...req.body });
            await this.departamentoRepository.save(updateDepartamento);
            res.status(200).json(updateDepartamento);
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const departamentoId = parseInt(req.params.id);
        const existingDepartamento = await this.departamentoRepository.findOneBy({id: departamentoId});

        if (!existingDepartamento) {
            res.status(404).send('Departamento não encontrado');
        }else {
            await this.departamentoRepository.delete(existingDepartamento);
            res.status(204).send();
        }
    };
}