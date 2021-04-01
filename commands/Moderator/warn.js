const Database = require("../../Database/Firestore.init.js")
const CustomEmbed = require("../../Utilities/customEmbed")
const SendError = require("../../Utilities/ErrorEmbed")
const admin = require('firebase-admin')
const Kick = require('../../Utilities/Kick')
module.exports = {
    name: "warn",
    permissions: "KICK_MEMBERS",
    description: "Warn a user",
    callback: (message, args) => {
        const { author, guild, channel } = message

        const member = message.mentions.members.first()
        const user = message.mentions.users.first()
        if (!user) return SendError(channel, "You must provide a user to warn")

        Database.collection("guilds").doc(guild.id).collection("warns").doc(user.id).get().then(snap => {
            if (snap.data().amount == 3) {
                Database.collection("guilds").doc(guild.id).collection("warns").doc(user.id).set({
                    amount: 0
                })
                Kick(channel, guild, member, 'console')
                return
            } else {
                Database.collection("guilds").doc(guild.id).collection("warns").doc(user.id).set({
                    amount: snap.data().amount+1
                })

                return channel.send(
                    CustomEmbed({
                        title: "Moderation",
                        description: `<@${user.id}> was warned`,
                        fields: [{
                            name: "**Reason**",
                            value: args.slice(1).join(" ") || "Not specified"
                        }, {
                            name: "**Moderator**",
                            value: author.username
                        }]
                    })
                )
            }
        })
    }
}