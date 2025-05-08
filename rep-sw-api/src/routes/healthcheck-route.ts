import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * /ccr/healthcheck:
 *   get:
 *     summary: Retorna o estado da API
 *     tags: [Healthcheck]
 *     responses:
 *       200:
 *         description: API funcionando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Sucesso"
 */
router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ status: "Sucesso" });
});

export default router;
