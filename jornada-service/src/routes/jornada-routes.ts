import { Router } from 'express';
import { JornadaController } from '../controller/jornada-controller';

const jornadaController = new JornadaController();
const router = Router();

/**
 * @swagger
 * /rep/jornadas:
 *   get:
 *     summary: Lista todas as jornadas
 *     tags: [Jornadas]
 *     responses:
 *       200:
 *         description: Lista de jornadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', jornadaController.getAll);

/**
 * @swagger
 * /rep/jornadas/{id}:
 *   get:
 *     summary: Retorna uma jornada pelo ID
 *     tags: [Jornadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da jornada
 *     responses:
 *       200:
 *         description: Jornada encontrada
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *       404:
 *         description: Jornada não encontrada
 */
router.get('/:id', jornadaController.getById);

/**
 * @swagger
 * /rep/jornadas:
 *   post:
 *     summary: Cria uma nova jornada
 *     tags: [Jornadas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - horario_entrada
 *               - horario_saida
 *             properties:
 *               horario_entrada:
 *                 type: string
 *                 example: "08:00:00"
 *               intervalo_inicio:
 *                 type: string
 *                 example: "12:00:00"
 *               intervalo_fim:
 *                 type: string
 *                 example: "13:00:00"
 *               horario_saida:
 *                 type: string
 *                 example: "17:00:00"
 *               dias_trabalho:
 *                 type: string
 *                 example: "Seg, Ter, Qua, Qui, Sex"
 *     responses:
 *       201:
 *         description: Jornada criada com sucesso
 */
router.post('/', jornadaController.create);

/**
 * @swagger
 * /rep/jornadas/{id}:
 *   put:
 *     summary: Substitui uma jornada existente
 *     tags: [Jornadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da jornada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - horario_entrada
 *               - horario_saida
 *             properties:
 *               horario_entrada:
 *                 type: string
 *                 example: "08:00:00"
 *               intervalo_inicio:
 *                 type: string
 *                 example: "12:00:00"
 *               intervalo_fim:
 *                 type: string
 *                 example: "13:00:00"
 *               horario_saida:
 *                 type: string
 *                 example: "17:00:00"
 *               dias_trabalho:
 *                 type: string
 *                 example: "Seg, Ter, Qua, Qui, Sex"
 *     responses:
 *       200:
 *         description: Jornada atualizada com sucesso
 *       404:
 *         description: Jornada não encontrada
 */
router.put('/:id', jornadaController.replace);

/**
 * @swagger
 * /rep/jornadas/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma jornada
 *     tags: [Jornadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da jornada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               horario_entrada:
 *                 type: string
 *                 example: "08:30:00"
 *               intervalo_inicio:
 *                 type: string
 *                 example: "12:30:00"
 *               intervalo_fim:
 *                 type: string
 *                 example: "13:30:00"
 *               horario_saida:
 *                 type: string
 *                 example: "17:30:00"
 *               dias_trabalho:
 *                 type: string
 *                 example: "Seg, Ter, Qua"
 *     responses:
 *       200:
 *         description: Jornada atualizada com sucesso
 *       404:
 *         description: Jornada não encontrada
 */
router.patch('/:id', jornadaController.update);

/**
 * @swagger
 * /rep/jornadas/{id}:
 *   delete:
 *     summary: Remove uma jornada
 *     tags: [Jornadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da jornada
 *     responses:
 *       204:
 *         description: Jornada removida com sucesso
 *       404:
 *         description: Jornada não encontrada
 */
router.delete('/:id', jornadaController.delete);


export default router;