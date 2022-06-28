import path from "path";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import { createRequestHandler } from "@remix-run/express";
import { exec } from "child_process";

export class Dash {
    public dev() {
        exec("concurrently \"remix dev\" \"yarn run generate:css -- --watch\"", (err, stdout, stderr) => {
            if (err)
                return console.error(err);
            console.log(stdout);
        });
    }

    public serve() {
        const BUILD_DIR = path.join(process.cwd(), "build");
        console.log(BUILD_DIR);

        const app = express();

        app.use(compression());

        app.disable("x-powered-by");

        app.use(
            "/build",
            express.static("public/build", { immutable: true, maxAge: "1y" }),
        );

        app.use(express.static("public", { maxAge: "1h" }));

        app.use(morgan("tiny"));

        app.all(
            "*",
            process.env.NODE_ENV === "development"
                ? (req, res, next) => {
                    purgeRequireCache();

                    return createRequestHandler({
                        build: require(BUILD_DIR + "/remix.js"),
                        mode: process.env.NODE_ENV,
                    })(req, res, next);
                }
                : createRequestHandler({
                    build: require(BUILD_DIR + "/remix.js"),
                    mode: process.env.NODE_ENV,
                }),
        );
        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`[DASH] info - Dashboard listening on port ${port}.`);
        });

        function purgeRequireCache() {
            for (const key in require.cache)
                if (key.startsWith(BUILD_DIR))
                    delete require.cache[key];
        }
    }
}