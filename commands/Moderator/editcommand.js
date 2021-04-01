const Database = require("../../Database/Firestore.init.js")
const CustomEmbed = require('../../Utilities/customEmbed')
module.exports = {
    name: "editcommand",
    description: "Edit a custom command",
    permissions: "MANAGE_GUILD",
    callback: (message, args) => {
        const { guild, channel } = message
        let key = Database.collection("guilds").doc(guild.id).collection("customCommands").doc(args[0])
        if(key) {
            key.update({
                callback: args.slice(1).join(" ")
            })
            
            return channel.send(CustomEmbed({
                title: "Custom Command",
                description: `Updated custom command: ${args[0]}`,
                fields: [{
                    name: "**New function**",
                    value: args.slice(1).join(" ")
                }]
            }))
}
    }
}