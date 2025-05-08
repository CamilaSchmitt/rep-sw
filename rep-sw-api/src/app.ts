import express, { json } from "express";
import cors from "cors";

import jornadasRoutes from "./routes/jornada-routes";
import departamentosRoutes from "./routes/departamento-routes";
import usuariosRoutes from "./routes/usuario-routes";
import loginRoutes from "./routes/login-routes";
import healthcheckRoute from "./routes/healthcheck-route";

import Authentication from "./middlewares/authentication";
import errorHandler from "./middlewares/error-handler";
import { setupSwagger } from "./swaggerConfig";

const app = express();
app.use(json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors({ origin: true, credentials: true }));

// Prefixo base da API
const API_PREFIX = "/rep";
const router = express.Router();
app.use(API_PREFIX, router);

// Rotas públicas
router.use("/", loginRoutes);
router.use("/healthcheck", healthcheckRoute);

// Rotas protegidas
router.use("/usuarios", Authentication.hasAuthentication, usuariosRoutes);

// Rotas abertas (ou adicionar autenticação se necessário)
router.use("/jornadas", jornadasRoutes);
router.use("/departamentos", departamentosRoutes);

// Swagger + tratamento de erros
setupSwagger(app);
app.use(errorHandler);

export default app;
