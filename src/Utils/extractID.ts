export default function extractID(arg: string) {
    if (arg.startsWith("<@") && arg.endsWith(">")) {
        let mention = arg.slice(2, -1);

        if (mention.startsWith("!")) {
            mention = mention.slice(1);
        }

        return mention;
    }

    if (/^\d{17,19}$/.test(arg))
        return arg;

    return null;
}