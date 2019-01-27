import {db} from '../loadFirebase';

let _serverApiHost;
const _getServerApiHost = async () => {
  if (typeof _serverApiHost === 'string') {
    return Promise.resolve(_serverApiHost);
  }

  return db
    .doc('meta/config')
    .get()
    .then((metaConfigDocSnap) => {
      if (!metaConfigDocSnap) {
        let errorMessage = 'The meta/config Firestore doc does not exist.';

        //eslint-disable-next-line no-console
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const {serverApiHost} = metaConfigDocSnap.data();

      if (typeof serverApiHost !== 'string' || serverApiHost === '') {
        let errorMessage = 'Server API host field not found in the meta/config Firestore doc.';

        //eslint-disable-next-line no-console
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      _serverApiHost = serverApiHost;

      return Promise.resolve(_serverApiHost);
    })
    .catch((error) => {
      let errorMessage = `Failed to fetch server API host: ${error.message}`;

      //eslint-disable-next-line no-console
      console.error(errorMessage);
      throw new Error(errorMessage);
    });
};

const fetchPrimeNumberString = async (postId, number) => {
  const serverApiHost = await _getServerApiHost();

  return fetch(`${serverApiHost}/primes`, {
    method: 'POST',
    body: JSON.stringify({
      postId,
      number,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (typeof data === 'object' && 'error' in data) {
        throw data.error;
      } else {
        return Promise.resolve(data);
      }
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (errorMessage === 'Failed to fetch') {
        error = new Error(
          'The server is temporarily unavailable. Please try again in a few seconds.'
        );
      }

      throw error;
    });
};

export {fetchPrimeNumberString};
