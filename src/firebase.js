
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDs0LiNMQrvKwBPwM4Idp-DY-FMILARKKQ",
    authDomain: "code-hub-f9773.firebaseapp.com",
    databaseURL: "https://code-hub-f9773.firebaseio.com",
    projectId: "code-hub-f9773",
    storageBucket: "code-hub-f9773.appspot.com",
    messagingSenderId: "96079154535"
  };
  
  firebase.initializeApp(config);


export default firebase;