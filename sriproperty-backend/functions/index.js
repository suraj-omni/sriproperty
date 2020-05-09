const functions = require("firebase-functions");
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
  advertReviewComment,
  addAdvertPayment,
  getAdvertPaymentbyAdvertId,
  advertGoLive,
  advertPaymentStatusUpdate,
} = require("./handlers/adverts");

const {
  signup,
  login,
  uploadImage,
  getAuthenticatedUser,
  sendResetPasswordEmail,
  updateUser,
} = require("./handlers/users");
const FBAuth = require("./util/FBAuth");

const app = require("express")();

//Get all adverts
app.get("/adverts", FBAuth, getAllAdverts);

//Get adverts by user id
app.get("/advertsbyUserid", FBAuth, getAdvertbyUserId);

//Admin page search
app.post("/adminSearch", FBAuth, adminSearch);

//Get advert by advert id
app.post("/advertbyid", FBAuth, getAdvertbyId);

//Add Adverts
app.post("/advert", FBAuth, addAdvert);

//Edit Advert
app.post("/advertedit", FBAuth, editAdvert);

//Advert Start Review
app.put("/advert/startReview/:advertid", FBAuth, advertStartReview);

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

exports.api = functions.https.onRequest(app);
