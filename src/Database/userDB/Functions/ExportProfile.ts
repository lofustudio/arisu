import Cookie from "../../../Client";
import { render } from 'prettyjson'

async function exportProfile(client: Cookie, memberID: string, format?: boolean) {
    if (format) {
        const rawData = client.userDB.fetch(memberID)
        const data = render(rawData, { emptyArrayMsg: '[]', noColor: true })
        return data;
    }
}