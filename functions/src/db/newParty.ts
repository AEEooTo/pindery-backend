import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DocumentData } from '@google-cloud/firestore';
import { DocumentBuilder } from 'firebase-functions/lib/providers/firestore';


try {
    admin.initializeApp(functions.config().firebase);
} catch (e) {
    console.log(e);
};

const partiesReference: DocumentBuilder = functions.firestore.document('/cities/{city}/parties/{party}');

export const notification = partiesReference
    .onCreate(
        (snap, context) => {
            const city: string = context.params.city;
            const capitalizedCity: string = capitalizeFirstLetter(city);
            const newParty: DocumentData = snap.data();
            const partyName: string = newParty.name;
            console.log(partyName + ' in ' + city);

            const message = {
                notification: {
                    title: 'New party nearby!',
                    body: 'There\'s a new party in ' + capitalizedCity + ': ' + partyName + '. Join now!',
                },
                topic: city,
            }
            console.log(city);
            return admin.messaging().send(message);
        }
    )

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}