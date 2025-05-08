import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

// Carrega variáveis de ambiente do .env
dotenv.config();

// Verifica se o código está rodando já compilado (em produção)
const isCompiled = path.extname(__filename) === ".js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // cuidado: true só em desenvolvimento
    logging: "all",

    // Usa .ts em dev, .js em produção
    entities: [isCompiled ? "dist/entities/*.js" : "src/entities/*.ts"],
    migrations: [
        isCompiled ? "dist/migration/**/*.js" : "src/migration/**/*.ts",
    ],
});
