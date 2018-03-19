// Requiring Firebase SDK
const functions = require('firebase-functions');


exports = module.exports = functions.https.onRequest((req, res, next) => {
        if (req.method !== 'POST' || !checkInput(req.body.firstNumber, req.body.secondNumber, req.body.operator)) {
            res.status(400).send('Bad request!');
        } else {
            let result = computation(req.body.firstNumber, req.body.secondNumber, req.body.operator);
            res.send(JSON.stringify({ "result": result }));
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