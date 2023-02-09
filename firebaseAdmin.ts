import admin from 'firebase-admin';
import { getApps } from 'firebase/app';

//const serviceAccount = require('./serviceAccountKey.json');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

if(!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
}

const adminDb = admin.firestore();

export {adminDb};