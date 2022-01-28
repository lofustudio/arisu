import Client from '../../Client';

export default async function fetchWarns(client: Client, memberID: string) {
    client.users.fetch(memberID).then(user => {
        const userDB = client.userDB;
        const warnsObj = userDB.get(`${user.id}.warns`);
        return warnsObj;
    }).catch(err => {
        throw err;
    })
}