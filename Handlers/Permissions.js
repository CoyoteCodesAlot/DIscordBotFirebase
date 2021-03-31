const sendError = require('../Utilities/ErrorEmbed')
const colors = require('colors')

module.exports = (message, permissions) => {
    let out;
    for(let i = 0; i < permissions.length; i++) {
        if(!message.member.hasPermission(permissions[i])) {
            out = false
            sendError(message.channel, 'Insufficient permission')
        } else {
            out = true
        }
    }

    return out
  }

  module.exports.checkPermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
      ]
  
      if(typeof permissions === 'string') { permissions = [permissions] } // If it's a string it gets turned into an array
      
      for(const permission of permissions) { // Maps each permission given
          if(!validPermissions.includes(permission)) { // Checks if given permission is an actual permission
              console.log(` Error: `.bgBlack.red+`${permission} is not a valid permission node. `.bgBlack)
              process.exit()
          }
      }
}