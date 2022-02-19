import config from '../config.json';
import fetchID from '../util/fetchID';

export default function isAdmin(imageURL: string): boolean {
    const id = fetchID(imageURL);
    if (config.admins.includes(id)) {
        return true;
    } else {
        return false;
    }
}
