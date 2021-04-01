module.exports = (message, args, client, callback) => {
    let output = callback.replace("{{sender}}", `<@${message.author.id}>`)
    return message.channel.send(output)
}