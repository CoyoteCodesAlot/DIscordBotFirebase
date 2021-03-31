module.exports = {
    name: "ping",
    description: "Ping connections",
    callback: (message, args) => {
        return message.reply("Pong!")
    }
}