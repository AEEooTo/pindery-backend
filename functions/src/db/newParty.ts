/**
 * Functions triggered on the creation of a new party on the DB
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { DocumentData } from "@google-cloud/firestore";
import { DocumentBuilder } from "firebase-functions/lib/providers/firestore";
import { capitalizeStringFirstLetter } from "../utils";

try {
    admin.initializeApp(functions.config().firebase);
} catch (e) {
    console.log(e);
};

/**
 * Reference on the DB to the parties collections in different cities
 */
const partiesReference: DocumentBuilder = functions.firestore.document("/cities/{city}/parties/{party}");

/**
 * Function to notify users when a new party is added.
 */
export const notification = partiesReference
    .onCreate(
        (snap, context) => {
            const city: string = context.params.city;
            const capitalizedCity: string = capitalizeStringFirstLetter(city);
            const newParty: DocumentData = snap.data();
            const partyName: string = newParty.name;
            const message = {
                notification: {
                    title: "New party nearby!",
                    body: "There's a new party in " + capitalizedCity + ": "  + partyName + ". Join now!",
                },
                topic: city,
            };
            console.log(city);
            return admin.messaging().send(message);
        }
    );