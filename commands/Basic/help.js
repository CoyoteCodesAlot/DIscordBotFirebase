const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'help',
    description: "Get a list of commands",
    callback: (message, args, client) => {
        let output = new MessageEmbed()
        .setTitle("Help")
        .setDescription("Listing categories of help")
        .setColor("#ffff")
        .setFooter(`Bot made by Hype#0069 | ${new Date().toLocaleTimeString()}`)
        client.commands.map(command => {
            output.addField(command.name, command.description)
        })
        message.channel.send(output)
    }
}