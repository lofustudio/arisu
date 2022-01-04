import { Event } from '../Interfaces/Event';
import muteSync from '../Util/muteSync';
import tempBanSync from '../Util/tempBanSync';

export const event: Event = {
    name: 'ready',
    run: async (client) => {
        console.log(`${client.user.tag} is online!`);
        console.log(`Prefix: ${client.config.prefix}`);
        client.user.setActivity(`Doki Doki Literature Club`, { type: 'PLAYING' });

        muteSync(client);
        tempBanSync(client);
    }
}