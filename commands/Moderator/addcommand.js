const Database = require("../../Database/Firestore.init.js")

module.exports = {
    name: "addcommand",
    description: "Add a custom message command to this guild",
    permissions: "MANAGE_GUILD",
    callback: (message, args) => {
let fullArgs = args.join(" ").split(",")
Database.collection('guilds').doc(message.guild.id).collection('customCommands').get().then(snap => {
    
        
        Database.collection('guilds').doc(message.guild.id).collection('customCommands').doc(fullArgs[0]).set({
            name: fullArgs[0],
            callback: fullArgs[1]
        })
        message.channel.send("added custom command")
})
    }
}