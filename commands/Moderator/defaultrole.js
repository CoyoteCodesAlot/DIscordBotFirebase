const Database = require('../../Database/Firestore.init.js')
const SendError = require('../../Utilities/ErrorEmbed')
const CustomEmbed = require('../../Utilities/customEmbed')

module.exports = {
    name: 'defaultrole',
    description: "Give new users a role on join",
    permissions: "MANAGE_GUILD",
    callback: (message, args) => {
        const { guild, channel, author } = message
        const server = Database.collection("guilds").doc(guild.id)

        server.update({
            defaultrole: args.join(" ")
        })

        return channel.send(CustomEmbed({
            title: 'Guild Settings',
            description: "Default join role updated",
            fields: [{
                name: '**New Role**',
                value: args.join(" ")
            }]
        }))
    }
}