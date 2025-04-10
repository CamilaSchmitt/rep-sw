import 'dotenv/config';
import 'reflect-metadata';
import app from './app';
import {datasource} from './config/datasource';
import logger from './utils/logger';

const port: number = parseInt(process.env.API_PORT || '3002', 10);

datasource.initialize()
    .then(() => {
        app.listen(port, () => {
            logger.info(`Server is running on http://localhost:${port}`);
            logger.info(`Swagger UI: http://localhost:${port}/docs`);
        });
    })
    .catch((error:any) => logger.error(error));

