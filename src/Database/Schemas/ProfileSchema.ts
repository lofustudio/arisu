const Schema = {
    warns: {
        amount: 0,
        data: []
    },

    roles: {
        notVerify: false,
        member: true,
        serverBoost: false,
        moderator: false,
        admin: false,
        owner: false
    },

    notes: {
        amount: 0,
        data: [],
        deleted: {
            amount: 0,
            data: []
        },
    }
}

export default Schema;