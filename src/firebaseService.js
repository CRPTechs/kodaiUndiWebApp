import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDXrWD5TwF-c3usyxE48BRhV7rj9FCSFtU",
    authDomain: "crpapp.firebaseapp.com",
    databaseURL: "https://crpapp-default-rtdb.firebaseio.com",
};
var db = firebase.initializeApp(config);

export default db.database().ref();