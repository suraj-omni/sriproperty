const admin = require("firebase-admin");
/* const serviceAccount = require("../sriproperty-8d3b1-firebase-adminsdk-ln3sq-6ec6e2d5ae.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sriproperty-8d3b1.firebaseio.com",
}); */
admin.initializeApp();
const db = admin.firestore();

module.exports = { admin, db };
