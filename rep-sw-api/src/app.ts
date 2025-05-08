import express, { json, Request, Response } from "express";
import cors from "cors";
import jornadasRoutes from "./routes/jornada-routes"; // Adjust the path as needed
import deparamentosRoutes from "./routes/departamento-routes"; // Adjust the path as needed
import usuariosRoutes from "./routes/usuario-routes"; // Adjust the path as needed
import { setupSwagger } from "./swaggerConfig";
import healthcheckRoute from "./routes/healthcheck-route";
import loginRoutes from "./routes/login-routes"; // Adjust the path as needed
import Authentication from "./middlewares/authentication";
import errorHandler from "./middlewares/error-handler";


const app = express();
app.use(json());
app.use(express.urlencoded({ extended: false }));

// Configuração do CORS permitindo credenciais e uma origem específica
const corsOptions = {
  origin: true, // Substitua pela URL do seu frontend
  credentials: true, // Permite enviar cookies e autenticação
};

app.use(cors(corsOptions)); // Usar as opções configuradas para CORS

// Definição do prefixo da API
const API_PREFIX = "/rep";
const router = express.Router();
app.use(API_PREFIX, router);

router.use("/", loginRoutes);
router.use("/healthcheck", healthcheckRoute);
router.use(
    "/usuarios",
    Authentication.hasAuthentication,
    usuariosRoutes
);

router.use("/jornadas", jornadasRoutes);
router.use("/departamentos", deparamentosRoutes); // Exemplo de outro endpoint, ajuste conforme necessário

setupSwagger(app); // Configuração do Swagger
app.use(errorHandler);
export default app;
