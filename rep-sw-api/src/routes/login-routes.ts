import { Router } from "express";
import { LoginController } from "../controller/login-controller";

const loginRoutes = Router();
const loginController = new LoginController();


/**
 * @swagger
 * /rep/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: fulano@gmail.com
 *               senha:
 *                 type: string
 *                 example: 123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Credenciais inválidas
 */
loginRoutes.post("/login", loginController.doLogin);

/**
 * @swagger
 * /rep/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cpf
 *               - situacao
 *               - telefone
 *               - email
 *               - senha
 *               - departamento
 *               - jornada
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               situacao:
 *                 type: string
 *                 enum: [Ativo, Inativo]
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               departamento:
 *                 type: integer
 *               jornada:
 *                 type: integer
 *             example:
 *               nome: Fulano de Tal
 *               cpf: "00000000000"
 *               situacao: Ativo
 *               telefone: "+5554999999999"
 *               email: fulano@gmail.com
 *               senha: "123"
 *               departamento: 1
 *               jornada: 1
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: E-mail já cadastrado ou dados inválidos
 *       500:
 *         description: Erro interno no servidor
 */
loginRoutes.post("/register", loginController.register);

/**
 * @swagger
 * /rep/logout:
 *   post:
 *     summary: Realiza o logout de um usuário
 *     tags: [Autenticação]
 *     responses:
 *       200:
 *         description: Logout bem-sucedido
 *       401:
 *         description: Token inválido ou não fornecido
 */
loginRoutes.post("/logout", loginController.logout);

/**
 * @swagger
 * /rep/refresh:
 *   post:
 *     summary: Atualiza o token de acesso
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token atualizado com sucesso
 *       401:
 *         description: Refresh token inválido ou não fornecido
 */
loginRoutes.post("/refresh", loginController.refresh);

export default loginRoutes;