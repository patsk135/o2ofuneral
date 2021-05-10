import { Router } from './router';
import { container } from './container';
import cors from 'cors';
import express from 'express';

const main = async () => {
    container.initializeDatabase();

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use('/', Router);
    app.listen(container.config.PORT, () => {
        console.log(`Server Started at Port, ${container.config.PORT}`);
    });
};

main();
