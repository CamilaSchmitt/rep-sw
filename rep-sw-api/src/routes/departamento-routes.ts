import {Router} from 'express';
import {DepartamentoController} from '../controller/departamento-controller';

const departamentoController = new DepartamentoController();
const router = Router();

/**
 * @swagger
 * /rep/departamentos:
 *   get:
 *     summary: Lista todos os departamentos
 *     tags: [Departamentos]
 *     responses:
 *       200:
 *         description: Lista de departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', departamentoController.getAll);

/**
 * @swagger
 * /rep/departamentos/{id}:
 *   get:
 *     summary: Retorna um departamento pelo ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do departamento
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *       404:
 *         description: Departamento não encontrado
 */
router.get('/:id', departamentoController.getById);


/**
 * @swagger
 * /rep/departamentos:
 *   post:
 *     summary: Cria um novo departamento
 *     tags: [Departamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Financeiro"
 *     responses:
 *       201:
 *         description: Departamento criado com sucesso
 * 
 */
router.post('/', departamentoController.create);

/**
 * @swagger
 * /rep/departamentos/{id}:
 *   put:
 *     summary: Substitui um departamento existente
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Tecnologia"
 *     responses:
 *       200:
 *         description: Departamento atualizado com sucesso
 *       404:
 *         description: Departamento não encontrado
 */
router.put('/:id', departamentoController.replace);

/**
 * @swagger
 * /rep/departamentos/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um departamento
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Recursos Humanos"
 *     responses:
 *       200:
 *         description: Departamento atualizado com sucesso
 *       404:
 *         description: Departamento não encontrado
 */
router.patch('/:id', departamentoController.update);

/**
 * @swagger
 * /rep/departamentos/{id}:
 *   delete:
 *     summary: Remove um departamento
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do departamento
 *     responses:
 *       204:
 *         description: Departamento removido com sucesso
 *       404:
 *         description: Departamento não encontrado
 */
router.delete('/:id', departamentoController.delete);


export default router;