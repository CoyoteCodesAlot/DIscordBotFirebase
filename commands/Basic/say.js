module.exports = {
    name: "say",
    description: "Make the bot say something",
    callback: (message, args) => {
        message.delete()
        return message.channel.send(args.join(" "))
    }
}