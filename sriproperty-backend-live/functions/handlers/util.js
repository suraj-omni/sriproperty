const { admin, db } = require("../util/admin");
const config = require("../util/config");
const types = require("../util/types");
const functions = require("firebase-functions");

exports.getLocations = (req, res) => {
  db.collection("locations")
    .get()
    .then((data) => {
      let locations = this.fillData(data);
      console.log("loocations", locations);
      return res.json(locations);
    })
    .catch((err) => {
      console.error(err);
      return res.json(err);
    });
};

exports.fillData = (data) => {
  let alllocations = [];
  data.forEach((doc) => {
    alllocations.push([`${doc.id}`, doc.data()]);
  });

  return alllocations;
};

exports.addLocations = (request, response) => {
  let alllocations = [];
  alllocations = request.body.locations;

  console.log("alllocations", alllocations);

  alllocations.forEach((location) => {
    //console.log("location", location);
    //console.log("location", location[0]);
    //console.log("location", location[1]);
    db.doc(`/locations/${location[0]}`).set(location[1]);
  });
  return response.status(201).json("Completed");
};

exports.getUsers = (req, res) => {
  db.collection("users")
    .get()
    .then((data) => {
      let users = this.fillData(data);
      console.log("users", users);
      return res.json(users);
    })
    .catch((err) => {
      console.error(err);
      return res.json(err);
    });
};
