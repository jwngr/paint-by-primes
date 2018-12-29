import firebase from 'firebase/app';

import firebaseConfig from './loadConfig';

require('firebase/storage');
require('firebase/firestore');

firebase.initializeApp(firebaseConfig);

export default firebase;

// Create and export a Firestore instance with specific settings.
const _db = firebase.firestore();
_db.settings({
  timestampsInSnapshots: true,
});
export const db = _db;

export const storage = firebase.storage();
