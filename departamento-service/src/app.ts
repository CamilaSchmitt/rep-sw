import express, { json } from "express";
import cors from "cors";

import departamentoRoutes from "./routes/departamento-routes";

import errorHandler from "./middlewares/error-handler";
import { setupSwagger } from "./swaggerConfig";

const app = express();
app.use(json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors({ origin: true, credentials: true }));

// Rotas próprias do jornada-service (SEM /rep!)
app.use("/departamentos", departamentoRoutes);

// Swagger + tratamento de erros
setupSwagger(app);
app.use(errorHandler);

export default app;
