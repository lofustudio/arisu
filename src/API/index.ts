import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
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
                                this.client.logger.add(path.parse(file).name, {
                                    text: `Loaded GET route: /api${route.path}`,
                                    status: 'succeed',
                                });
                            } else {
                                this.app.get(`/api/${category}${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                this.client.logger.add(`${route.name}`, {
                                    text: `Loaded GET route: /api/${category}${route.path}`,
                                    status: 'succeed',
                                });
                            }
                        }
                            break;

                        case "PUT": {
                            if (path.parse(file).name === 'index') {
                                this.app.put(`/api${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                this.client.logger.add(path.parse(file).name, {
                                    text: `Loaded PUT route: /api${route.path}`,
                                    status: 'succeed',
                                });
                            } else {
                                this.app.put(`/api/${category}${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                this.client.logger.add(`${route.name}`, {
                                    text: `Loaded PUT route: /api/${category}${route.path}`,
                                    status: 'succeed',
                                });
                            }
                        }
                            break;

                        case "POST": {
                            if (path.parse(file).name === 'index') {
                                this.app.post(`/api${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                this.client.logger.add(`${route.name}`, {
                                    text: `Loaded POST route: /api${route.path}`,
                                    status: 'succeed',
                                });
                            } else {
                                this.app.post(`/api/${category}${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                this.client.logger.add(`${route.name}`, {
                                    text: `Loaded POST route: /api/${category}${route.path}`,
                                    status: 'succeed',
                                });;
                            }
                        }
                            break;

                        case "DELETE": {
                            if (path.parse(file).name === 'index') {
                                this.app.delete(`/api${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                this.client.logger.add(`${route.name}`, {
                                    text: `Loaded DELETE route: /api${route.path}`,
                                    status: 'succeed',
                                });
                            } else {
                                this.app.delete(`/api/${category}${route.path}`, (req: Request, res: Response) => {
                                    route.handler(this.client, req, res);
                                });
                                this.client.logger.add(`${route.name}`, {
                                    text: `Loaded DELETE route: /api/${category}${route.path}`,
                                    status: 'succeed',
                                });
                            }
                        }
                            break;
                    }
                }
            })
        });

        this.app.listen(this.client.settings.get('settings.api.port'), () => {
            this.client.logger.succeed('API', { text: 'API has initialized.' });
        });
    }
}