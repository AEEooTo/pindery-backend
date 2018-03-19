/** newParty.f.js
 *  
 */


// Firebase SDK requires
// Firebase SDK requires
const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.
// const admin = require('../admin.js');

// DB import
let db = admin.firestore();

// Function
exports = module.exports = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        res.sendStatus(400);
    }
    // Grab the text parameter.
    const party = req.body;
    const city = (party.city).toLowerCase();
    const partiesDocRef = db.collection('cities/' + city + '/parties')
    // Push the new party into the Realtime Database using the Firebase Admin SDK.
    return partiesDocRef.add(party).then(() => {
        return res.status(200).send('Added party');
    })
});

