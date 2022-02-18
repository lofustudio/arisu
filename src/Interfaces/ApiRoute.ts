import { Request, Response } from "express";
import Cookie from '../Client';

interface handler {
    (client: Cookie, req: Request, res: Response): void;
}


export interface ApiRoute {
    path: string;
    method: string;
    protected: boolean;
    handler: handler;
}