import firebase from 'firebase/app';

import firebaseConfig from './loadConfig';

require('firebase/storage');
require('firebase/firestore');

try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  // eslint-disable-next-line
  console.log('[ERROR] Failed to initialize Firebase:', error);
  // eslint-disable-next-line
  console.log(
    '[DEBUG] Attempted to initialize Firebase with the following config:',
    firebaseConfig
  );
  throw error;
}

export default firebase;

// Create and export a Firestore instance with specific settings.
const _db = firebase.firestore();
_db.settings({
  timestampsInSnapshots: true,
});
export const db = _db;

export const storage = firebase.storage();
