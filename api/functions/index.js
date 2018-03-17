// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// The Firebase Admin SDK to access the Firebase Realtime Database.
admin.initializeApp(functions.config().firebase);
// [END import]

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.AEEoTo = functions.https.onRequest((request, response) => {
    response.send("Greetings from AEEoTo team! Now arrow functions work!");
})
;

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
// Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        return res.redirect(303, snapshot.ref);
    });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original').onWrite((event) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = event.data.val();
    console.log('Uppercasing', event.params.pushId, original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return event.data.ref.parent.child('uppercase').set(uppercase);
});

exports.helloName = functions.https.onRequest((request, response) => {
    if (request.method !== 'GET' || request.params.name === undefined) {
        response.status(400).send('Bad request!');
    } else {
        response.send('Hello, ' + request.params.name + '! This is our API!');
    }
});

exports.calculator = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST' || !checkInput(request.body.firstNumber, request.body.secondNumber, request.body.operator)) {
        response.status(400).send('Bad request!');
    } else {
        let result = computation(request.body.firstNumber, request.body.secondNumber, request.body.operator);
        response.send(JSON.stringify({"result": result}));
    }
});

function checkInput(firstNumber, secondNumber, operator) {
    if (typeof firstNumber !== 'number' || typeof secondNumber !== 'number' || !operatorCheck(operator)) {
        return 0;
    }
    return 1;
}

function operatorCheck(operator) {
    if (operator !== "+" && operator !== "*" && operator !== "/" && operator !== "-") {
        return 0;
    }
    return 1;
}

function computation(firstNumber, secondNumber, operator) {
    switch (operator) {
        case '-':
            return firstNumber - secondNumber;
        case '*':
            return firstNumber * secondNumber;
        case '/':
            return firstNumber / secondNumber;
        default:
            return firstNumber + secondNumber;
    }

}