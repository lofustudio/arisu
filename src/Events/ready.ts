import Cookie from '../Client';
import PunishmentSync from './PunishmentSync';

export const event: Event = {
    name: 'ready',
    run: async (client: Cookie) => {
        console.log(`${client.user.tag} is online!`);
        console.log(`Prefix: ${client.config.prefix}`);
        client.user.setActivity(`Doki Doki Literature Club`, { type: 'PLAYING' });
        PunishmentSync(client);
    }
}