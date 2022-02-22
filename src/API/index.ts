import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { readdirSync } from 'fs';
import { ApiRoute } from '../Interfaces/ApiRoute';
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
            res.send({ "hello": "world" });
        });

        const routesPath = path.join(__dirname, ".", "Routes");
        readdirSync(routesPath).forEach((category) => {
            const categoryPath = path.join(routesPath, category);
            readdirSync(categoryPath).forEach((method) => {
                const methodPath = path.join(categoryPath, method);
                const routes = readdirSync(`${methodPath}`).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

                for (const file of routes) {
                    const { route } = require(`${methodPath}/${file}`);
                    switch (method) {
                        case "GET": {
                            this.app.get(route, (req: Request, res: Response) => {
                                route.handler(req, res, this.client);
                            });
                            console.log(`[API] Loaded ${method} route: ${route.path}`);
                        }
                            break;

                        case "PUT": {
                            this.app.put(route, (req: Request, res: Response) => {
                                route.handler(req, res, this.client);
                            });
                        }
                            break;

                        case "POST": {
                            this.app.post(route, (req: Request, res: Response) => {
                                route.handler(req, res, this.client);
                            });
                        }
                            break;

                        case "DELETE": {
                            this.app.delete(route, (req: Request, res: Response) => {
                                route.handler(req, res, this.client);
                            });
                        }
                            break;
                    }
                }
            })
        });

        this.app.listen(this.client.config.apiPort, () => {
            console.log(`[API] Listening on port ${this.client.config.apiPort}`);
        });
    }
}