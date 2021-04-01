const Database = require('../../Database/Firestore.init.js')

module.exports = {
    name: 'database',
    permissions: 'MANAGE_GUILD',
    callback: (message, args) => {
        const { guild } = message
        let out = ""
        const guilds = Database.collection("guilds").doc(guild.id)
        guilds.get().then(guildsnap => {
            
        guilds.collection("customCommands").get().then(cmdsnap => {
                cmdsnap.docs.map(commands => {
                    guilds.collection("warns").get().then(warnsnap => {
                        warnsnap.docs.map(users => {
                            let             guildconf = JSON.stringify(guildsnap.data()).split("{").join("{\n").split("}").join("\n}").split(",").join(",\n")
                        
                        let cmds = JSON.stringify(commands.data()).split("{").join("{\n").split("}").join("\n}").split(",").join(",\n")
                        let warns = JSON.stringify(users.data()).split("{").join("{\n").split("}").join("\n}").split(",").join(",\n")
                        
                        return message.channel.send(
                            `Showing database for ${guild.name}\n\`CONFIG\n${guildconf}\nCUSTOM COMMANDS\n${cmds}\nWARNS\n${warns}\``)
                            return
                    })})
                })
            })

        })
    }
}