const Database = require("../../Database/Firestore.init.js")
const CustomEmbed = require('../../Utilities/customEmbed')
module.exports = {
    name: "deletecommand",
    description: "Delete a custom command",
    permissions: "MANAGE_GUILD",
    callback: (message, args) => {
        Database.collection("guilds").doc(message.guild.id).collection("customCommands").doc(args[0]).delete()

        return message.channel.send(CustomEmbed({
            title: "Custom Commands",
            description: `Command ${args[0]} has been removed`,
            fields: [{
                name: '**Moderator**',
                value: message.author.username
            }]
        }))
    }
}