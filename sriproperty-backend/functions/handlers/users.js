const { admin, db } = require("../util/admin");
const config = require("../util/config");
const {
  validateSignupData,
  validateloginData,
  validatePasswordReset,
  validateUpdateUser,
} = require("../util/validators");
const firebase = require("firebase");
firebase.initializeApp(config);

//sign up user
exports.signup = (request, response) => {
  const newUser = {
    email: request.body.email,
    password: request.body.password,
    confirmpassword: request.body.confirmpassword,
    phonenumber: request.body.phonenumber,
    phonenumberconfirmed: false,
    name: request.body.name,
  };

  //validation
  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return response.status(400).json(errors);

  let tokenId, userid;
  let noimage = "blank-profile-picture.jpg";
  db.doc(`/users/${newUser.phonenumber}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        errors.phonenumber = "phone number is already registered.";
        return response.status(400).json(errors);
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then((data) => {
            //console.log("data.user.uid", data.user.uid);
            //console.log("data.user.getIdToken()", data.user.getIdToken());
            userid = data.user.uid;
            return data.user.getIdToken();
          })
          .then((token) => {
            tokenId = token;
            const userCredentials = {
              email: newUser.email,
              createdAt: new Date().toISOString(),
              userid,
              name: newUser.name,
              phonenumber: newUser.phonenumber,
              phonenumberconfirmed: newUser.phonenumberconfirmed,
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noimage}?alt=media`,
            };
            return db.doc(`/users/${newUser.phonenumber}`).set(userCredentials);
          })
          .then(() => {
            return response.status(201).json({ tokenId });
          })
          .catch((err) => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
              errors.email =
                "E mail is already registered. Please pick another e-mail or contact us, if you have forgot your password.";
              return response.status(400).json(errors);
            } else if (err.code === "auth/weak-password") {
              errors.password =
                "Weak password. Password should be atleast 6 characters";
              return response.status(400).json(errors);
            } else {
              errors.general = err.code;
              return response.status(500).json({ errors });
            }
          });
      }
    });
};

//update user
exports.updateUser = (request, response) => {
  const updateUser = {
    email: request.body.email,
    phonenumber: request.body.phonenumber,
    phonenumberconfirmed: request.body.phonenumberconfirmed,
    name: request.body.name,
    imageUrl: request.body.imageUrl,
  };

  const { valid, errors } = validateUpdateUser(updateUser);

  if (!valid) return response.status(400).json(errors);

  return db
    .doc(`/users/${request.user.phonenumber}`)
    .update(updateUser)
    .then(() => {
      let msgs = {};
      msgs.userupdate = "User successfully updated!!!";
      return response.status(201).json({ msgs });

      //console.log("Email is sent to reset password !!!");
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

//login user

exports.login = (request, response) => {
  const loginUser = {
    email: request.body.email,
    password: request.body.password,
  };

  //validation

  const { valid, errors } = validateloginData(loginUser);

  if (!valid) return response.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(loginUser.email, loginUser.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return response.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        errors.general = "Invalid credentials";
        return response.status(403).json(errors);
      } else {
        err.general = err.code;
        return response.status(500).json({ err });
      }
    });
};

//get authenticated user
exports.getAuthenticatedUser = (request, response) => {
  let userData = {};
  console.log("request.user", request.user);

  db.doc(`/users/${request.user.phonenumber}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        //console.log("userData.credentials", userData.credentials);
        return response.json(userData);
      }
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

//send reset email link
exports.sendResetPasswordEmail = (request, response) => {
  const loginUser = {
    email: request.user.email,
  };
  //console.log("sendResetPasswordEmail", request.user.email);
  //validation

  const { valid, errors } = validatePasswordReset(loginUser);

  if (!valid) return response.status(400).json(errors);

  firebase
    .auth()
    .sendPasswordResetEmail(loginUser.email)
    .then(() => {
      let msgs = {};
      msgs.passwordreset = "Email is sent to reset password !!!";
      //console.log("Email is sent to reset password !!!");
      return response.status(201).json({ msgs });
    })
    .catch((err) => {
      console.error(err);
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        errors.general = "Invalid credentials";
        return response.status(403).json(errors);
      } else {
        err.general = err.code;
        return response.status(500).json({ err });
      }
    });
};

//uploaad image
exports.uploadImage = (request, response) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: request.headers });

  let imageFileName;
  let imagetobeUploaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" && mimetype != "image/png") {
      return response.status(400).json({ error: "Wrong file type" });
    }
    //console.log("fieldname", fieldname);
    //console.log("filename", filename);
    //console.log("mimetype", mimetype);

    const imageExtention = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${Math.round(
      Math.random() * 1000000000
    )}.${imageExtention}`;

    const filepath = path.join(os.tmpdir(), imageFileName);

    imagetobeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on("finish", () => {
    const { v4: uuidv4 } = require("uuid");
    const uuid = uuidv4();
    //console.log("imageFileName", imageFileName);
    admin
      .storage()
      .bucket()
      .upload(imagetobeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imagetobeUploaded.mimetype,
            firebaseStorageDownloadTokens: uuid,
          },
        },
      })
      .then((res) => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        /* console.log(res);
        console.log("imageFileName", imageFileName);
        console.log("imageUrl", imageUrl); */
        return db
          .doc(`/users/${request.user.phonenumber}`)
          .update({ imageUrl });
      })
      .then(() => {
        return response.json({ messeage: "Image uploaded successfully!!!" });
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  });

  busboy.end(request.rawBody);
};
