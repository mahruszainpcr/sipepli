import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCVd4HOhFE04KSSIlaFVRML23HVTGq3FyY",
    authDomain: "cbppt-d0b1f.firebaseapp.com",
    databaseURL: "https://cbppt-d0b1f.firebaseio.com",
    projectId: "cbppt-d0b1f",
    storageBucket: "cbppt-d0b1f.appspot.com",
    messagingSenderId: "220821708515"
};
firebase.initializeApp(config);

const rootRef = firebase.database().ref();
export const tasksRef = rootRef.child('tasks');
export const timeRef = firebase.database.ServerValue.TIMESTAMP;