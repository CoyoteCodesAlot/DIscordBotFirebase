const CustomEmbed = require("./customEmbed")

module.exports = (channel, guild, member, reason) => {
    channel.send(CustomEmbed({
        title: "Auto Mod",
        description: `${member.user.username} has been kicked from this guild.`,
        fields: [{
            name: '**Reason**',
            value: reason === 'console' ? 'Too many infractions' : reason || 'Unspecified'
        }]
    }))
    member.send(CustomEmbed({
        title: "Auto Mod",
        description: `You have been kicked from ${guild.name}`,
        fields: [{
            name: '**Reason**',
            value: reason === 'console' ? 'Too many infractions' : reason || 'Unspecified'
        }]
    }))
    member.kick()
}