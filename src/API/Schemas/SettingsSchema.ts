const SettingsSchema = {
    type: "object",
    properties: {
        prefix: { type: "string" },
        guildID: { type: "string" },
        api: {
            type: "object", properties: {
                port: { type: "integer" }
            }
        },

    },
    additionalProperties: false
}

export default SettingsSchema;