import Arisu from "./Modules/Client";

new Arisu({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildMembers",
        "GuildBans",
        "GuildEmojisAndStickers",
        "GuildInvites",
        "GuildMessageReactions",
        "GuildVoiceStates",
        "MessageContent",
    ]
}).init();