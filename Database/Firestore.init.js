
var admin = require("firebase-admin");
const serviceAccount = require('./serviceAccount.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-bot-bd45f-default-rtdb.firebaseio.com"
  });

const db = admin.firestore()

module.exports.guilds = db.collection('guilds')
module.exports = db