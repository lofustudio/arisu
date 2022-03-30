import Cookie from '../Client';
import { DiscordEvent } from '../Interfaces/DiscordEvent';
import express, { Request, Response } from 'express';
import { Api } from '../API';
import next from 'next';

export const event: DiscordEvent = {
    name: 'ready',
    run: async (client: Cookie) => {
        client.user.setActivity(`Doki Doki Literature Club`, { type: 'PLAYING' });

        // Mute Sync
        if (client.database.settings.get('settings.guildID') == null || undefined) return new Error('The GuildID has returned null or undefined. Please delete the file "json.sqlite" and restart the process. Contact the developer if this error persists.');
        const guildObj = client.guilds.cache.get(client.database.settings.get('settings.guildID'));
        const muteRole = guildObj.roles.cache.find(r => r.name.toLowerCase() === 'muted');
        if (!muteRole) {
            // create a mute role
            await guildObj.roles.create({
                name: 'muted',
                color: '#f4424b',
                permissions: [
                    'VIEW_CHANNEL',
                    'READ_MESSAGE_HISTORY',
                    'CONNECT'
                ],
                mentionable: false,
                hoist: false,
                position: 0,
                reason: 'could not find mute role. created one instead...',
            });
        }

        // Mutes Sync
        client.database.mutes.SyncMutes(guildObj, muteRole);

        // TempBan Sync
        client.database.tempBans.SyncTempBans(client, guildObj);

        // Initalise API
        const API = new Api(client);
        client.logger.add('API', { text: 'Loading API...' });
        API.init();


        // Initialise Dashboard
        client.logger.add('DASH', {
            text: 'Initializing Dashboard...'
        });

        const app = next({
            dev: process.env.NODE_ENV != 'development',
            quiet: true,
            dir: './dashboard'
        });

        const handle = app.getRequestHandler();

        app.prepare().then(() => {
            const server = express();
            server.all('*', (req: Request, res: Response) => {
                return handle(req, res);
            });

            server.listen(client.database.settings.get('settings.dash.port'), () => {
                client.logger.succeed('DASH', {
                    text: `Dashboard is running! (http://localhost:3000)`,
                });
            });
        });
    }
}