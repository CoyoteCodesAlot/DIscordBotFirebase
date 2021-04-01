const Database = require("../../Database/Firestore.init.js")
const CustomEmbed = require("../../Utilities/customEmbed")
const SendError = require("../../Utilities/ErrorEmbed")

module.exports = {
    name: "warns",
    permissions: "KICK_MEMBERS",
    description: "View the warns of a user",
    callback: (message, args) => {
        const user = message.mentions.users.first()
        
        try {
            Database.collection("guilds").doc(message.guild.id).collection("warns").doc(user.id).get().then(snap => {
                return message.channel.send(CustomEmbed({
                    title: "Moderation",
                    description: `Showing warns for <@${user.id}>`,
                    fields: [{
                        name: "**Warns**",
                        value: snap.data().amount
                    }]
                }))
            })
        } catch(err) {
            return SendError(message.channel, "**Invalid user**")
        }
    }
}