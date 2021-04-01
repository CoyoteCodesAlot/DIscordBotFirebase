const Database = require('../../Database/Firestore.init.js')
const SendError = require('../../Utilities/ErrorEmbed')
const { MessageEmbed } = require('discord.js')

let replaceVars = (original, data) => {
    let result = original

    for (let index = 0; index < data.length; index++) {
        for (let ix = 0; ix < data[index].vars.length; ix++) {
            result = result.replace(data[index].vars[ix], data[index].out[ix])
        }
    }

    return result
}

module.exports = (client, member) => {
    Database.collection("guilds").doc(member.guild.id).get().then(snap => {
        if (snap.data().defaultrole) {
            const role = member.guild.roles.cache.find(r => r.name === snap.data().defaultrole)

            member.roles.add(role)
        }

        if(snap.data().welcomemsg) {
            guildSettings = snap.data()
            const channel = member.guild.channels.cache.find(c => c.name === guildSettings.welcomemsg.channel) || member.guild.channels.cache.find(c => c.name === "welcome");

            const { title, description, color, footer, image } = guildSettings.welcomemsg

            let newDesc = replaceVars(description, [{
                vars: [
                    '{user}',
                    '{time}',
                    '{date}',
                    '{memberCount}',
                    '{guildName}'
                ],
                out: [
                    `<@${member.id}>`,
                    new Date().toLocaleTimeString(),
                    new Date().toLocaleDateString(),
                    client.guilds.cache.find(guild => guild.id === member.guild.id).members.cache.size,
                    member.guild.name
                ]
            }])

            let newFooter = replaceVars(footer, [{
                vars: [
                    '{user}',
                    '{time}',
                    '{date}'
                ],
                out: [`<@${member.id}>`,
                    new Date().toLocaleTimeString(),
                    new Date().toLocaleDateString()
                ]
            }])

            if (!image) {
                return channel.send(
                    new MessageEmbed().setTitle(title).setDescription(newDesc).setColor(color).setFooter(newFooter)
                )
            } else {
                return channel.send(
                    new MessageEmbed().setTitle(title).setDescription(newDesc).setColor(color).setFooter(newFooter).setImage(image)
                )
            }
        }
    })
}