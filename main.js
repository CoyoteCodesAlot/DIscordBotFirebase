const Discord = require("discord.js")
const client = new Discord.Client()
const config = require('dotenv').config()
const fs = require('fs')
const path = require("path")
const colors = require('colors')
const Handlers = require('./Handlers/Events')
const Database = require('./Database/Firestore.init.js')

client.commands = new Discord.Collection()

client.on("ready", () => {
    
    const readCommands = (dir) => {
        const files = fs.readdirSync(dir)
        for(const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if(stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else {
                const fileContent = require(path.join(__dirname, dir, file))
                client.commands.set(file.slice(0,file.length-3), fileContent)
                console.log(' Loaded command: '.bgBlack.blue+`${file.slice(0,file.length-3)} `.bgBlack.white)
            }
            
        }
    }

    readCommands('commands')
    
    Handlers.readyEvent(client) 
})

client.on('guildCreate', (guild) => {Handlers.guildCreateEvent(guild)})

client.on('guildDelete', (guild) => {Handlers.guildDeleteEvent(guild)})

client.on("message", (message) => {
    const { guild, author, content } = message

    Database.collection('guilds').doc(guild.id).get().then(snap => { // Find document by guild id
        if(author.bot || !content.startsWith(snap.data().prefix)) { // If message was sent by bot or message doesn't start with guild prefix, return
            return
        } else { // Author isn't bot and/or message starts with guild prefix
            Handlers.commandEvent(message, client.commands, client)
        }
    })
    
})



client.login(config.parsed.BOT_TOKEN)

module.exports = client;

