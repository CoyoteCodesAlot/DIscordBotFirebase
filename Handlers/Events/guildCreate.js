const colors = require('colors')
const Database = require('../../Database/Firestore.init.js')

module.exports = (guild) => {
    Database.collection('guilds').doc(guild.id).set({
        prefix: '!'
    }, {
        merge: true
    }) // Adds the new guild to Firestore

    console.log(` Bot joined guild ${guild.name} [${guild.id}] `.bgBlack.green)
}