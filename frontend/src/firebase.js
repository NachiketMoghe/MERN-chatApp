const firebaseConfig = {
    apiKey: "AIzaSyBbukQ_ouu-3pPpk47bQ9rt13G9o2P7P-E",
    authDomain: "messenger-mern-a48ae.firebaseapp.com",
    projectId: "messenger-mern-a48ae",
    storageBucket: "messenger-mern-a48ae.appspot.com",
    messagingSenderId: "916837686515",
    appId: "1:916837686515:web:15df79ce90184ef3c92b86"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export default db;
export {auth, provider}