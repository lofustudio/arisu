import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import path from 'path';
import { readdirSync } from 'fs';
import Cookie from '../Client';
import ms from 'ms';

export class Api {
    private client: Cookie;
    private app: express.Application;

    constructor(client: Cookie) {
        this.client = client;
        this.app = express();
    }

    public async init() {
        this.app.use(bodyParser.json());
        this.app.use(cors({ origin: `http://localhost:${this.client.settings.get('settings.api.port')}`, credentials: true }));
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
                            if (path.parse(file).name === "index") {
                                this.app.get(`/api${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                console.log(`[API] Loaded ${method} route: /api${route.path}`);
                            } else {
                                this.app.get(`/api/${category}${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                console.log(`[API] Loaded ${method} route: /api/${category}${route.path}`);
                            }
                        }
                            break;

                        case "PUT": {
                            if (path.parse(file).name === 'index') {
                                this.app.put(`/api${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                console.log(`[API] Loaded ${method} route: /api${route.path}`);
                            } else {
                                this.app.put(`/api/${category}${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                console.log(`[API] Loaded ${method} route: /api/${category}${route.path}`);
                            }
                        }
                            break;

                        case "POST": {
                            if (path.parse(file).name === 'index') {
                                this.app.post(`/api${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                console.log(`[API] Loaded ${method} route: /api${route.path}`);
                            } else {
                                this.app.post(`/api/${category}${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                console.log(`[API] Loaded ${method} route: /api/${category}${route.path}`);
                            }
                        }
                            break;

                        case "DELETE": {
                            if (path.parse(file).name === 'index') {
                                this.app.delete(`/api${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                console.log(`[API] Loaded ${method} route: /api${route.path}`);
                            } else {
                                this.app.delete(`/api/${category}${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                console.log(`[API] Loaded ${method} route: /api/${category}${route.path}`);
                            }
                        }
                            break;
                    }
                }
            })
        });

        this.app.listen(this.client.settings.get('settings.api.port'), () => {
            console.log(`[API] Listening on port ${this.client.settings.get('settings.api.port')}`);
        });
    }
}