const Database = require('../../Database/Firestore.init.js')
const Permissions = require('../Permissions')

module.exports = (Message, Collection, Client) => {
    const { author, guild, channel, content } = Message
    Database.collection('guilds').doc(guild.id).get().then(snap => {
        const Command = content.substr(snap.data().prefix.length) // Gets rid of prefix depending on length
    })
    const Arguments = content.trim().split(' ').slice(1) // Splits arguments and drops the command name
    Collection.map(cmd => {
        if(Command.toLowerCase().startsWith(`${cmd.name}`)) { // Make sure the command matches anything that's an actual command
            if(!cmd.permissions) return cmd.callback(Message, Arguments, Client) // See if the command has a permissions requirement in the file
            
            if(Permissions(Message, cmd.permissions)) return cmd.callback(Message, Arguments, Client) // Call permissions file to check if user has permission
        }
    })
}