import Cookie from "../../Client";

async function deleteProfile(client: Cookie, memberID: string) {
    if (!client.userDB.has(memberID)) return false;
    try {
        client.userDB.delete(memberID) 
    } catch (err) {
        console.log(err)
        return false;
    }
    return true;
}