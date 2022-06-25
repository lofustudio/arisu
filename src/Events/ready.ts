import { Dash } from '../Modules/Dash';
import { DiscordEvent } from '../Interfaces/DiscordEvent';

export const event: DiscordEvent<'ready'> = {
    name: 'ready',
    run: (client) => {
        const dash = new Dash();
        if (
            process.env.TS_NODE_DEV === 'true' ||
            process.env.NODE_ENV === 'development'
        ) {
            client.log.event.info(
                'Starting dashboard in dev mode: http://localhost:3000/'
            );
            dash.dev();
        } else {
            client.log.event.info('Starting dashboard: http://localhost:3000/');
            dash.serve();
        }
    },
};
