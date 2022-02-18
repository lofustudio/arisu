import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { ApiRoute } from '../Interfaces/ApiRoute';
import * as basicAuth from 'express-basic-auth';
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

        this.app.get('/', (req, res) => {
            res.redirect('/api');
        });

        this.app.get('/api', (req, res) => {
            res.send('Hello, world!');
        });

        const routesPath = path.join(__dirname, ".", "Routes");
        readdirSync(routesPath).forEach((dir) => {
            const routes = readdirSync(`${routesPath}/${dir}`).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

            for (const file of routes) {
                const { route } = require(`${routesPath}/${dir}/${file}`);
                console.log(`[API] Loading API route: ${route.path}`);
                this.app.get(`${route.path}`, (req, res) => {
                    route.handler(this.client, req, res);
                });
            }
        });

        this.app.listen(this.client.config.apiPort, () => {
            console.log(`[API] Listening on port ${this.client.config.apiPort}`);
        });
    }
}