import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../config/datasource';
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
        const jornadaId = parseInt(req.params.id);
        const jornada = await this.jornadaRepository.findOneBy({ id: jornadaId });

        if (!jornada) {
            res.status(404).json({ message: 'Jornada não encontrada' });
            return;
        }

        res.status(200).json(jornada);
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log("REQ.BODY NO CREATE:", req.body); // debug

            const {
                horario_entrada,
                intervalo_inicio,
                intervalo_fim,
                horario_saida,
                dias_trabalho
            } = req.body || {};

            if (
                !horario_entrada ||
                !intervalo_inicio ||
                !intervalo_fim ||
                !horario_saida ||
                !Array.isArray(dias_trabalho)
            ) {
                res.status(400).json({ message: 'Campos obrigatórios faltando ou inválidos' });
                return;
            }

            const jornadaData = {
                horarioEntrada: horario_entrada,
                intervaloInicio: intervalo_inicio,
                intervaloFim: intervalo_fim,
                horarioSaida: horario_saida,
                diasTrabalho: dias_trabalho
            };

            const novaJornada = this.jornadaRepository.create(jornadaData);
            await this.jornadaRepository.save(novaJornada);
            res.status(201).json(novaJornada);

        } catch (error) {
            console.error('Erro ao criar jornada:', error);
            res.status(500).json({ message: 'Erro ao criar jornada' });
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const jornadaId = parseInt(req.params.id);
        const jornadaExistente = await this.jornadaRepository.findOneBy({ id: jornadaId });

        if (!jornadaExistente) {
            res.status(404).json({ message: 'Jornada não encontrada' });
            return;
        }

        const {
            horario_entrada,
            intervalo_inicio,
            intervalo_fim,
            horario_saida,
            dias_trabalho,
            ...outrosCampos
        } = req.body;

        const dadosAtualizar = {
            ...outrosCampos,
            ...(horario_entrada !== undefined && { horarioEntrada: horario_entrada }),
            ...(intervalo_inicio !== undefined && { intervaloInicio: intervalo_inicio }),
            ...(intervalo_fim !== undefined && { intervaloFim: intervalo_fim }),
            ...(horario_saida !== undefined && { horarioSaida: horario_saida }),
            ...(dias_trabalho !== undefined && { diasTrabalho: dias_trabalho }),
        };

        console.log("PATCH dadosAtualizar:", dadosAtualizar);

        const jornadaAtualizada = this.jornadaRepository.merge(jornadaExistente, dadosAtualizar);

        await this.jornadaRepository.save(jornadaAtualizada);
        res.status(200).json(jornadaAtualizada);
    };



    replace = async (req: Request, res: Response): Promise<void> => {
        const jornadaId = parseInt(req.params.id);
        const jornadaExistente = await this.jornadaRepository.findOneBy({ id: jornadaId });

        if (!jornadaExistente) {
            res.status(404).json({ message: 'Jornada não encontrada' });
            return;
        }

        const {
            horario_entrada,
            intervalo_inicio,
            intervalo_fim,
            horario_saida,
            dias_trabalho
        } = req.body || {};

        if (
            !horario_entrada ||
            !intervalo_inicio ||
            !intervalo_fim ||
            !horario_saida ||
            !Array.isArray(dias_trabalho)
        ) {
            res.status(400).json({ message: 'Campos obrigatórios faltando ou inválidos' });
            return;
        }

        const jornadaData = {
            horarioEntrada: horario_entrada,
            intervaloInicio: intervalo_inicio,
            intervaloFim: intervalo_fim,
            horarioSaida: horario_saida,
            diasTrabalho: dias_trabalho
        };

        const jornadaAtualizada = this.jornadaRepository.merge(jornadaExistente, jornadaData);
        await this.jornadaRepository.save(jornadaAtualizada);
        res.status(200).json(jornadaAtualizada);
    };


    delete = async (req: Request, res: Response): Promise<void> => {
        const jornadaId = parseInt(req.params.id);
        const jornadaExistente = await this.jornadaRepository.findOneBy({ id: jornadaId });

        if (!jornadaExistente) {
            res.status(404).json({ message: 'Jornada não encontrada' });
            return;
        }

        await this.jornadaRepository.delete(jornadaId);
        res.status(204).send();
    };
}
