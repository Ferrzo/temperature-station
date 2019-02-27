const firebase = require("firebase-admin");
const sensor = require("ds18b20-raspi");

const serviceAccount = require("./key/serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://home-temperature-station.firebaseio.com"
});

const now = new Date();
const db = firebase.database();
const ref = db.ref(
  `temperature/${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
);

sensor.readSimpleC((err, temperature) => {
  if (err) {
    console.log(err);
  }
  if(temperature) {
      const newData = {
        temperature: temperature,
        timestamp: now.getTime()
      };

      ref.push(newData, a => {
        if (a) {
          console.log(a);
        } else {
          console.log(`logged ${temperature} C at ${now}.`);
        }
        db.goOffline();
        process.exit();
      });
  }
});

// GET DATA:
/*ref.on('value', function(snapshot) {
    console.log(snapshot.val());
  });*/
