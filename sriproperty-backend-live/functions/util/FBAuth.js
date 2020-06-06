const { admin, db } = require("./admin");

module.exports = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  //console.log("id token", idToken);

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      //console.log("decoded token", decodedToken);
      //console.log("req.user", req.user);

      return db
        .collection("users")
        .where("userid", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      //console.log("user data", data);
      req.user.name = data.docs[0].data().name;
      req.user.phonenumber = data.docs[0].data().phonenumber;
      req.user.isAdmin = data.docs[0].data().isAdmin;
      req.user.monthly_free_ads = data.docs[0].data().monthly_free_ads;
      //console.log("data.docs[0].data()", data.docs[0].data());
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying the token", err);
      return res.status(403).json(err);
    });
};
