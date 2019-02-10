var firebase = require("firebase-admin");
var serviceAccount = require("./key/serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://home-temperature-station.firebaseio.com"
});

//TODO: Connect with raspberry PI extensions
//TODO: Cron vs timer

//TEST:
const now = new Date().getTime();
const temperatureValue = 33.33;


let db = firebase.database();
let ref = db.ref('temperature');
/*ref.on('value', function(snapshot) {
    console.log(snapshot.val());
  });*/


ref.push({
    temperature: temperatureValue,
    date: now
}, (a) => { if (a) { console.log(a); } else {console.log(`logged ${temperatureValue} at ${now}.`) } });
