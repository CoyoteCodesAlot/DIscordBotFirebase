const {checkPermissions} = require('../Permissions')

module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}`)
    client.commands.map(command => {
        if(!command.permissions) return // Stop this function from continuing because the command file has no permissions declared
        checkPermissions(command.permissions) // Make sure all permissions in command files are an actual permission
    })
}