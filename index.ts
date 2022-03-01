import { exec } from "child_process";
import * as fs from "fs";

const args = process.argv.slice(2);

switch (args[0]) {
    case 'build': {
        console.log('Building...');
        if (fs.existsSync('./build')) fs.rmSync('./build', { recursive: true, force: true });
        fs.mkdirSync('./build');
        exec('cd ./dashboard && next build', (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
            console.log(stderr);
        });
        fs.cpSync('./dashboard/.next', './build/dashboard/.next');
        fs.rmSync('./dashboard/.next');
        exec('tsc');
        console.log('Done.')
    }
        break;

    case 'start': {
        console.log('Starting...');
    }
        break;

    case 'dev': {
        console.log('Starting in development mode...');
    }
        break;

    default: {
        console.log('Please specify a command. Available commands: build, start, dev');
    }
        break;
}