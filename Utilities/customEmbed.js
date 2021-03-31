const { MessageEmbed } = require('discord.js')

module.exports = (options) => {
    let output = new MessageEmbed()
        .setTitle(options.title)
        .setDescription(options.description)
        .setColor("#ffff")
        .setFooter(`Bot made by Hype#0069 | ${new Date().toLocaleTimeString()}`)
    for(let i = 0;i < options.fields.length;i++) {
        output.addField(options.fields[i].name,options.fields[i].value)
    }

    return output
}