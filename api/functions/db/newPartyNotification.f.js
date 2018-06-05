const functions = require('firebase-functions');
const admin = require('firebase-admin');

try { admin.initializeApp(functions.config().firebase); } catch (e) { foo }

// DB import
let partiesReference = functions.firestore.document('/cities/{city}/parties/{party}');

exports = module.exports = newPartyNotification = partiesReference
    .onCreate(
        (snap, context) => {
            const city = context.params.city;
            const capitalizedCity = capitalizeFirstLetter(city);
            const newParty = snap.data();
            const partyName = newParty.name;
            console.log(partyName + ' in ' + city);

            const message = {
                notification: {
                    title: 'New party nearby!',
                    body: 'There\'s a new party in ' + capitalizedCity + ': ' + partyName + '. Join now!',
                },
                topic: city,
            }

            return admin.messaging().send(message);
        }
    )

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}