const Database = require('../../Database/Firestore.init.js')
const SendError = require('../../Utilities/ErrorEmbed')
const CustomEmbed = require('../../Utilities/customEmbed')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'welcome',
    description: "Set the welcome message",
    permissions: "MANAGE_GUILD",
    callback: (message, args) => {
        const { guild, channel, author } = message
        const server = Database.collection("guilds").doc(guild.id)

        const arguments = args.join(" ").split(",")

        let updateconf = (res) => {
            server.update({
                welcomemsg: {
                    title: res.title,
                    description: res.description,
                    image: res.image || undefined,
                    footer: res.footer,
                    color: res.color,
                    channel: res.channel || "welcome"
                }
            })
        }
        try {
            if (arguments.length < 4) {
                return channel.send(
                    new MessageEmbed()
                        .setTitle('Welcome Message Editor')
                        .setDescription('You must provide a JSON format.')
                        .addField("**Variables**", '{user}, {time}, {date}, {memberCount},, {guildName}')
                        .addField('**Example**', '`"title": "Welcome",\n"description": "Welcome {user}! You are user #{memberCount}",\n"color": "RANDOM",\n"footer": "{time} | {date}",\n"channel": "welcome" <Recommended>,\n"image": "URL" <optional>`')
                )
            }
            let messageJson = JSON.parse(`{ ${args.join(" ")} }`)

            let embed = "Embed error"
            if (!messageJson.image) {
                embed = new MessageEmbed()
                    .setTitle('Welcome Message Editor')
                    .setColor('#e55757')
                    .setDescription('Welcome message for this server has been updated.')
                    .addField("New Welcome: ", `**Title:** ${messageJson.title}\n**Description:** ${messageJson.description}\n\n**Footer:** ${messageJson.footer}\n**Channel:** #${messageJson.channel}`)
            } else {
                embed = new MessageEmbed()
                    .setTitle('Welcome Message Editor')
                    .setColor('#e55757')
                    .setDescription('Welcome message for this server has been updated.')
                    .addField("New Welcome: ", `**Title:** ${messageJson.title}\n**Description:** ${messageJson.description}\n**Image:** ${messageJson.image}\n\n**Footer:** ${messageJson.footer}\n**Channel:** #${messageJson.channel}`)
            }

            message.channel.send(
                embed
            )

            updateconf(messageJson)
        } catch (e) {
            console.log(e)
            message.reply('You must provide 4 variables: `"title", "color", "footer", "description"`, optional `"image"` variable must be supplied as a URL.')
        }
    }
}