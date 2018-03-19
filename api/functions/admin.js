/**  admin.js
 *   This is necessary since 'firebase-admin' can be imported just once
 *   Thanks to Joe Noon at this post: https://goo.gl/s62kR4
 * 
*/

const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);


module.exports = {
    admin,
};