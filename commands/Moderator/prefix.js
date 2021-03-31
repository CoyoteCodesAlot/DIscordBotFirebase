const Database = require('../../Database/Firestore.init.js')
const CustomEmbed = require('../../Utilities/customEmbed')

module.exports = {
    name: 'prefix',
    description: 'Get or set the guild\'s prefix',
    permissions: 'MANAGE_GUILD',
    callback: (message, args) => {
        Database.collection('guilds').doc(message.guild.id).get().then(snap => {
            if(args.length === 0) {
                return message.channel.send(
                    CustomEmbed({
                        title: 'Guild Settings',
                        description: `Showing prefix for ${message.guild.name}`,
                        fields: [
                            {
                                name: '**Prefix**',
                                value: snap.data().prefix
                            }
                        ]
                    })
                )
            }

            message.channel.send(
                CustomEmbed({
                    title: 'Guild Settings',
                    description: `Prefix updated for ${message.guild.name}`,
                    fields: [
                        {
                            name: '**Old Prefix**',
                            value: snap.data().prefix
                        },
                        {
                            name: '**New Prefix**',
                            value: args[0]
                        }
                    ]
                })
            )

            Database.collection('guilds').doc(message.guild.id).update({
                prefix: args[0]
            })
        })

        
    }
}