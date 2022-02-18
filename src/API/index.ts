import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { readdirSync } from 'fs';
import Cookie from '../Client';

export class Api {
    private client: Cookie;
    private app: express.Application;

    constructor(client: Cookie) {
        this.client = client;
        this.app = express();
    }

    public async init() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(helmet());

        const routesPath = path.join(__dirname, '.', 'routes');
        readdirSync(routesPath).forEach((file) => {
            const { route } = require(`${routesPath}/${file}`);
            console.log(`Loading API route: ${route.path}`);
            this.app.use(route.path, route.handler.bind(null, this.client));
        });

        this.app.listen(this.client.config.apiPort, () => {
            console.log(`[API] Listening on port ${this.client.config.apiPort}`);
        });
    }
}