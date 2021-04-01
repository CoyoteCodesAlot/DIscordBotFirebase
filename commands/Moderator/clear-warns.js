const Database = require('../../Database/Firestore.init.js')
const CustomEmbed = require('../../Utilities/customEmbed')

module.exports = {
    name: 'clearwarns',
    description: "Clear warns from a user",
    permission: "KICK_MEMBERS",
    callback: (message, args) => {
        const { guild, channel, mentions, author } = message

        const user = mentions.users.first()

        Database.collection("guilds").doc(guild.id).collection("warns").doc(user.id).set({
            amount: 0
        })

        return channel.send(CustomEmbed({
            title: "Moderation",
            description: `Warns reset for user <@${user.id}>`,
            fields: [{
                name: '**Moderator**',
                value: author.username
            }]
        }))
    }
}