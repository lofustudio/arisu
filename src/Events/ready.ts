import { dev, serve } from '../Modules/Dash/dashboard';
import { client } from '..';
import { DiscordEvent } from '../Interfaces/DiscordEvent';
import { Logger } from '../Modules/Core/logger';

export const ready: DiscordEvent<'ready'> = {
    name: 'ready',
    add: () => {
        client.on('ready', ready.run);
    },
    run: () => {
        const log = new Logger('ready');
        if (
            process.env.TS_NODE_DEV === 'true' ||
            process.env.NODE_ENV === 'development'
        ) {
            log.info(
                'Starting dashboard in development mode. http://localhost:3000/'
            );
            dev();
        } else {
            log.info('Starting dashboard...');
            serve();
        }
    },
};
