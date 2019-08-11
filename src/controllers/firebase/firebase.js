import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as Config from './config';

const config = process.env.NODE_ENV === 'production'
    ? Config.prod
    : Config.dev;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};