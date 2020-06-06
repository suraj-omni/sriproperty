const functions = require("firebase-functions");
const { admin, db } = require("./util/admin");
const {
  getAllAdverts,
  addAdvert,
  editAdvert,
  deleteAdvert,
  getAdvertbyId,
  uploadAdvertImage,
  deleteAdImage,
  getAdvertbyUserId,
  adminSearch,
  advertStartReview,
  advertSubmitReview,
  advertReviewComment,
  addAdvertPayment,
  getAdvertPaymentbyAdvertId,
  advertGoLive,
  advertPaymentStatusUpdate,
  getAdvertLocationTotal,
  SearchAdverts,
  getFeaturedProperties,
  getLatestProperties,
} = require("./handlers/adverts");

const {
  signup,
  login,
  uploadImage,
  getAuthenticatedUser,
  sendResetPasswordEmail,
  updateUser,
} = require("./handlers/users");

const { getLocations, addLocations } = require("./handlers/util");
const FBAuth = require("./util/FBAuth");

const app = require("express")();

const cors = require("cors");

app.use(cors());

//Get Locations
app.get("/locations", getLocations);
app.post("/locations", addLocations);

//Get all adverts
app.get("/adverts", getAllAdverts);

app.get("/getFeaturedAdverts", getFeaturedProperties);

app.get("/getLatestAdverts", getLatestProperties);

app.get("/advertlocationtotal", getAdvertLocationTotal);

//Get adverts by user id
app.get("/advertsbyUserid", FBAuth, getAdvertbyUserId);

//Admin page search
app.post("/adminSearch", FBAuth, adminSearch);

//General search
app.post("/searchadverts", SearchAdverts);

//Get advert by advert id
app.post("/advertbyid", getAdvertbyId);

//Add Adverts
app.post("/advert", FBAuth, addAdvert);

//Edit Advert
app.post("/advertedit", FBAuth, editAdvert);

//Advert Start Review
app.put("/advert/startReview/:advertid", FBAuth, advertStartReview);

//Advert Submit Review
app.put("/advert/pushtoReview/:advertid", FBAuth, advertSubmitReview);

//Advert Review Comment
app.put("/advert/reviewComment/:advertid", FBAuth, advertReviewComment);

app.put("/advert/goLive/:advertid", FBAuth, advertGoLive);

app.delete("/advert/:advertid", FBAuth, deleteAdvert);

//Add Advert Payment
app.post("/advertPayment", FBAuth, addAdvertPayment);

//Get Advert Payment
app.get("/advertPayment/:advertid", FBAuth, getAdvertPaymentbyAdvertId);

//Advert Payment status
app.put("/advert/payment/:advertid", FBAuth, advertPaymentStatusUpdate);

//upload image
app.post("/advert/image", FBAuth, uploadAdvertImage);

//delete image
app.post("/advert/imagedelete", FBAuth, deleteAdImage);

//User sign up
app.post("/signup", signup);

//login route
app.post("/login", login);

//get authenticated user
app.get("/user", FBAuth, getAuthenticatedUser);

//app.get("/resetFreeAd", FBAuth, setFreeAdWhenDeleting);

//update user
app.post("/user", FBAuth, updateUser);

app.post("/user/image", FBAuth, uploadImage);

app.post("/user/sendResetPasswordEmail", FBAuth, sendResetPasswordEmail);

//This function will update the document locations with advert total based on add edit or delete. it will increase or decrease by 1 based on action.
exports.updateAdvertsCounts = functions.firestore
  .document("adverts/{advertid}")
  .onWrite((change, context) => {
    // Retrieve the current and previous value
    const data = change.after.exists ? change.after.data() : null;
    const previousData = change.before.exists ? change.before.data() : null;

    const {
      advertStatus: oldadvertStatus,
      district: olddistrict,
      city: oldcity,
    } = { ...previousData };

    console.log(
      "oldadvertStatus olddistrict oldcity",
      `${oldadvertStatus},${olddistrict},${oldcity} `
    );

    //Document is deleted
    if (data === null) {
      if (oldadvertStatus === "LIVE") {
        var del_locationscountRef = db
          .collection("locations")
          .doc(`${olddistrict}`);

        const increment = admin.firestore.FieldValue.increment(-1);
        return del_locationscountRef
          .update({
            [`${oldcity}`]: increment,
            ["total"]: increment,
          })
          .then(function () {
            console.log("Data update upon delete!");
            return null;
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error when updating Data upon delete: ", error);
            return null;
          });
      } else {
        return null;
      }
    }

    const {
      advertStatus: newadvertStatus,
      district: newdistrict,
      city: newcity,
    } = { ...data };

    console.log(
      "newadvertStatus newdistrict newcity",
      `${newadvertStatus},${newdistrict},${newcity} `
    );

    // New Record with Status is LIVE
    if (previousData === null) {
      if (newadvertStatus === "LIVE") {
        var add_locationscountRef = db
          .collection("locations")
          .doc(`${newdistrict}`);

        const increment = admin.firestore.FieldValue.increment(1);
        return add_locationscountRef
          .update({
            [`${newcity}`]: increment,
            ["total"]: increment,
          })
          .then(function () {
            console.log("Data update upon new advert a Live!");
            return null;
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error(
              "Error when updating Data upon a new advert a Live: ",
              error
            );
            return null;
          });
      } else {
        return null;
      }
    }

    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (data === previousData) return null;
    if (data.advertStatus === previousData.advertStatus) return null;

    var locationscountRef = db.collection("locations").doc(`${data.district}`);

    if (newadvertStatus === "LIVE") {
      //If New Status is live we need to increase the value of common total count table by 1

      const increment = admin.firestore.FieldValue.increment(1);
      return locationscountRef
        .update({
          [`${data.city}`]: increment,
          ["total"]: increment,
        })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    } else if (oldadvertStatus === "LIVE") {
      //If Old Status is live meaning there was an edit to a live data, hence we need to decrease the value of common total count table by 1

      const increment = admin.firestore.FieldValue.increment(-1);
      return locationscountRef
        .update({
          [`${data.city}`]: increment,
          ["total"]: increment,
        })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    } else {
      return null;
    }
  });

exports.api = functions.https.onRequest(app);
