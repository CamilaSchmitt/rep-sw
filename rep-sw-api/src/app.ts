import express, { json, Request, Response } from "express";
import cors from "cors";
import jornadasRoutes from "./routes/jornada-routes"; // Adjust the path as needed
import deparamentosRoutes from "./routes/departamento-routes"; // Adjust the path as needed
import usuariosRoutes from "./routes/usuario-routes"; // Adjust the path as needed
import { setupSwagger } from "./swaggerConfig";

const app = express();
app.use(json());
app.use(express.urlencoded({ extended: false }));

// Configuração do CORS permitindo credenciais e uma origem específica
const corsOptions = {
  origin: ["http://192.168.0.207:3000", "http://localhost:3000"], // Substitua pela URL do seu frontend
  credentials: true, // Permite enviar cookies e autenticação
};

app.use(cors(corsOptions)); // Usar as opções configuradas para CORS

// Definição do prefixo da API
const API_PREFIX = "/rep";
const router = express.Router();
app.use(API_PREFIX, router);


router.use("/jornadas", jornadasRoutes);
router.use("/departamentos", deparamentosRoutes); // Exemplo de outro endpoint, ajuste conforme necessário
router.use("/usuarios", usuariosRoutes);

setupSwagger(app); // Configuração do Swagger
export default app;
