import Cookie from "../../../Client";

async function deleteProfile(client: Cookie, memberID: string) {
    if (!client.database.users.has(memberID)) return false;
    try {
        client.database.users.delete(memberID)
    } catch (err) {
        console.log(err)
        return false;
    }
    return true;
}