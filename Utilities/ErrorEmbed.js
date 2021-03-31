const { MessageEmbed } = require('discord.js')

module.exports = (channel, text) => {
    const output = new MessageEmbed()
        .setTitle('Something went wrong')
        .setDescription(text)
        .setFooter(`${new Date().toLocaleTimeString()}`)
        .setColor('RED')

    return channel.send(output)
}