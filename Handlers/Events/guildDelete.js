const colors = require('colors')
const Database = require('../../Database/Firestore.init.js')

module.exports = (guild) => {
    Database.collection('guilds').doc(guild.id).delete() // Deletes the document from Firestore for better optimization

    console.log(` Bot left guild ${guild.name} [${guild.id}] `.bgBlack.red)
}