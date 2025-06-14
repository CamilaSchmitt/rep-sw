import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import DepartamentoEntity from "../entities/departamento-entity";

export class DepartamentoController {
    private departamentoRepository: Repository<DepartamentoEntity>;

    constructor() {
        this.departamentoRepository = AppDataSource.getRepository(DepartamentoEntity);
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const departamentos = await this.departamentoRepository.find();
        res.status(200).json(departamentos);
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const departamento = await this.departamentoRepository.findOneBy({ id });

        if (!departamento) {
            res.status(404).json({ message: "Departamento não encontrado" });
            return;
        }

        res.status(200).json(departamento);
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { nome } = req.body;

            if (!nome) {
                res.status(400).json({ message: "O campo 'nome' é obrigatório." });
                return;
            }

            const novoDepartamento = this.departamentoRepository.create({ nome });
            await this.departamentoRepository.save(novoDepartamento);

            res.status(201).json(novoDepartamento);
        } catch (error) {
            console.error("Erro ao criar departamento:", error);
            res.status(500).json({ message: "Erro ao criar departamento" });
        }
    };

    replace = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const departamentoExistente = await this.departamentoRepository.findOneBy({ id });

        if (!departamentoExistente) {
            res.status(404).json({ message: "Departamento não encontrado" });
            return;
        }

        const { nome } = req.body;

        if (!nome) {
            res.status(400).json({ message: "O campo 'nome' é obrigatório para substituição." });
            return;
        }

        const departamentoAtualizado = this.departamentoRepository.merge(departamentoExistente, { nome });
        await this.departamentoRepository.save(departamentoAtualizado);

        res.status(200).json(departamentoAtualizado);
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const departamentoExistente = await this.departamentoRepository.findOneBy({ id });

        if (!departamentoExistente) {
            res.status(404).json({ message: "Departamento não encontrado" });
            return;
        }

        const departamentoAtualizado = this.departamentoRepository.merge(departamentoExistente, req.body);
        await this.departamentoRepository.save(departamentoAtualizado);

        res.status(200).json(departamentoAtualizado);
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const departamentoExistente = await this.departamentoRepository.findOneBy({ id });

        if (!departamentoExistente) {
            res.status(404).json({ message: "Departamento não encontrado" });
            return;
        }

        await this.departamentoRepository.delete(id);
        res.status(204).send();
    };
}
