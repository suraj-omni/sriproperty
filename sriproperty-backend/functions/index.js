const functions = require("firebase-functions");
const {
  getAllAdverts,
  addAdvert,
  editAdvert,
  getAdvertbyId,
  uploadAdvertImage,
  deleteAdImage,
  getAdvertbyUserId,
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

//Get advert by advert id
app.post("/advertbyid", FBAuth, getAdvertbyId);

//Add Adverts
app.post("/advert", FBAuth, addAdvert);

//Edit Advert
app.post("/advertedit", FBAuth, editAdvert);

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

//update user
app.post("/user", FBAuth, updateUser);

app.post("/user/image", FBAuth, uploadImage);

app.post("/user/sendResetPasswordEmail", FBAuth, sendResetPasswordEmail);

exports.api = functions.https.onRequest(app);
