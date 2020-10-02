import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBkLbN5N4aVhmOAi8_ji1LGdpXZCKWp3HA',
  authDomain: 'irembo-cpanel.firebaseapp.com',
  databaseURL: 'https://irembo-cpanel.firebaseio.com',
  projectId: 'irembo-cpanel',
  storageBucket: 'irembo-cpanel.appspot.com',
  messagingSenderId: '535170001303',
  appId: '1:535170001303:web:a9b0504570b3500f373cd2',
  measurementId: 'G-TK7HHRL00L'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      // console.log("Error creating users", error.message);
    }
  }

  return userRef; // we may need it for something else in our code
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
