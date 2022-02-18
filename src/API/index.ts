import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import passport from 'passport';
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

        this.app.use(passport.initialize());
        this.app.use(passport.session());

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
                if (path.parse(file).name === "index") {
                    console.log(`[API] Loading API route: /api/${path.parse(dir).name}`);
                    this.app.get(`/api/` + path.parse(dir).name, route.handler.bind(this, this.client));
                } else {
                    console.log(`[API] Loading API route: /api/${path.parse(dir).name}${route.path}`);
                    this.app.get(`/api/` + path.parse(dir).name + `${route.path}`, route.handler.bind(this, this.client));
                }
            }
        });

        this.app.listen(this.client.config.apiPort, () => {
            console.log(`[API] Listening on port ${this.client.config.apiPort}`);
        });
    }
}