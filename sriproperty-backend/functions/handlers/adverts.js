const { admin, db } = require("../util/admin");
const config = require("../util/config");

//const firebase = require("firebase");
// firebase.initializeApp(config);

//get all adverts

exports.getAllAdverts = (req, res) => {
  db.collection("adverts")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let adverts = [];
      data.forEach((doc) => {
        adverts.push({
          advertId: doc.id,
          address: doc.data().address,
          advertStatus: doc.data().advertStatus,
          adverttype: doc.data().adverttype,
          approvedBy: doc.data().approvedBy,
          baths: doc.data().baths,
          beds: doc.data().beds,
          boostadvert: doc.data().boostadvert,
          boostuntil: doc.data().boostuntil,
          category: doc.data().category,
          city: doc.data().city,
          createdBy: doc.data().createdBy,
          description: doc.data().description,
          district: doc.data().disctrict,
          image1Url: doc.data().image1Url,
          image2Url: doc.data().image2Url,
          image3Url: doc.data().image3Url,
          image4Url: doc.data().image4Url,
          image5Url: doc.data().image5Url,
          landtypes: doc.data().landtypes,
          /* landdtype1: doc.data().landdtype1,
          landdtype2: doc.data().landdtype2,
          landdtype3: doc.data().landdtype3,
          landdtype4: doc.data().landdtype4, */
          landsize: doc.data().landsize,
          landsizeunit: doc.data().landsizeunit,
          name: doc.data().name,
          paymentStatus: doc.data().paymentStatus,
          phonenumber1: doc.data().phonenumber1,
          phonenumber1verified: doc.data().phonenumber1verified,
          phonenumber2: doc.data().phonenumber2,
          phonenumber2verified: doc.data().phonenumber2verified,
          phonenumber3: doc.data().phonenumber3,
          phonenumber3verified: doc.data().phonenumber3verified,
          phonenumber4: doc.data().phonenumber4,
          phonenumber4verified: doc.data().phonenumber4verified,
          phonenumber5: doc.data().phonenumber5,
          phonenumber5verified: doc.data().phonenumber5verified,
          propertytype: doc.data().propertytype,
          rentaloprice: doc.data().rentaloprice,
          rentalopricenegotiable: doc.data().rentalopricenegotiable,
          rentalopriceunit: doc.data().rentalopriceunit,
          title: doc.data().title,
          urgentbadge: doc.data().urgentbadge,
          createdAt: doc.data().createdAt,
          modifiedAt: doc.data().modifiedAt,
        });
      });
      return res.json(adverts);
    })
    .catch((err) => console.error(err));
};

//get adverts by user id
exports.getAdvertbyUserId = (req, res) => {
  const userid = req.user.uid;
  console.log("userid", userid);
  db.collection("adverts")
    .where("userid", "==", userid)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      console.log("data", data);

      let adverts = [];
      data.forEach((doc) => {
        adverts.push({
          advertId: doc.id,
          address: doc.data().address,
          advertStatus: doc.data().advertStatus,
          adverttype: doc.data().adverttype,
          approvedBy: doc.data().approvedBy,
          baths: doc.data().baths,
          beds: doc.data().beds,
          boostadvert: doc.data().boostadvert,
          boostuntil: doc.data().boostuntil,
          category: doc.data().category,
          city: doc.data().city,
          createdBy: doc.data().createdBy,
          description: doc.data().description,
          district: doc.data().disctrict,
          image1Url: doc.data().image1Url,
          image2Url: doc.data().image2Url,
          image3Url: doc.data().image3Url,
          image4Url: doc.data().image4Url,
          image5Url: doc.data().image5Url,
          landtypes: doc.data().landtypes,
          /* landdtype1: doc.data().landdtype1,
          landdtype2: doc.data().landdtype2,
          landdtype3: doc.data().landdtype3,
          landdtype4: doc.data().landdtype4, */
          landsize: doc.data().landsize,
          landsizeunit: doc.data().landsizeunit,
          name: doc.data().name,
          paymentStatus: doc.data().paymentStatus,
          phonenumber1: doc.data().phonenumber1,
          phonenumber1verified: doc.data().phonenumber1verified,
          phonenumber2: doc.data().phonenumber2,
          phonenumber2verified: doc.data().phonenumber2verified,
          phonenumber3: doc.data().phonenumber3,
          phonenumber3verified: doc.data().phonenumber3verified,
          phonenumber4: doc.data().phonenumber4,
          phonenumber4verified: doc.data().phonenumber4verified,
          phonenumber5: doc.data().phonenumber5,
          phonenumber5verified: doc.data().phonenumber5verified,
          propertytype: doc.data().propertytype,
          rentaloprice: doc.data().rentaloprice,
          rentalopricenegotiable: doc.data().rentalopricenegotiable,
          rentalopriceunit: doc.data().rentalopriceunit,
          title: doc.data().title,
          urgentbadge: doc.data().urgentbadge,
          createdAt: doc.data().createdAt,
          modifiedAt: doc.data().modifiedAt,
        });
      });
      console.log("userid", userid);
      return res.json(adverts);
    })
    .catch((err) => console.error(err));
};

// add advert

exports.addAvert = (request, response) => {
  console.log("addAvert", JSON.stringify(request.body));
  //console.log(request.user);
  let noimage = "no-image-icon.png";
  const advert = {
    address: request.body.address ? request.body.address : "",
    advertStatus: request.body.advertStatus,
    adverttype: request.body.adverttype,
    approvedBy: "",
    baths: request.body.baths ? request.body.baths : 0,
    beds: request.body.beds ? request.body.beds : 0,
    boostadvert: "",
    boostuntil: "",
    category: request.body.category,
    city: request.body.city,
    createdBy: request.user.uid,
    description: request.body.description,
    district: request.body.district,
    image1Url: "", //request.body.image1Url,
    image2Url: "", //request.body.image2Url,
    image3Url: "", //request.body.image3Url,
    image4Url: "", //request.body.image4Url,
    image5Url: "", //request.body.image5Url,
    landtypes: request.body.landtypes ? request.body.landtypes : "",
    //landdtype1: request.body.landdtype1,
    //landdtype2: request.body.landdtype2,
    //landdtype3: request.body.landdtype3,
    //landdtype4: request.body.landdtype4,
    landsize: request.body.landsize ? request.body.landsize : 0,
    landsizeunit: request.body.landsizeunit ? request.body.landsizeunit : "",
    name: request.user.name,
    paymentStatus: "not paid", //request.body.paymentStatus,
    phonenumber1: request.user.phonenumber, // request.body.phonenumber1,
    phonenumber1verified: false, //request.body.phonenumber1verified,
    phonenumber2: "", //request.body.phonenumber2,
    phonenumber2verified: false, //request.body.phonenumber2verified,
    phonenumber3: "", // request.body.phonenumber3,
    phonenumber3verified: false, // request.body.phonenumber3verified,
    phonenumber4: "", //request.body.phonenumber4,
    phonenumber4verified: false, // request.body.phonenumber4verified,
    phonenumber5: "", //request.body.phonenumber5,
    phonenumber5verified: false, // request.body.phonenumber5verified,
    propertytype: request.body.propertytype ? request.body.propertytype : "",
    rentaloprice: request.body.rentaloprice,
    rentalopricenegotiable: request.body.rentalopricenegotiable
      ? request.body.rentalopricenegotiable
      : false,
    rentalopriceunit: request.body.rentalopriceunit
      ? request.body.rentalopriceunit
      : "",
    size: request.body.size ? request.body.size : 0,
    title: request.body.title,
    urgentbadge: false, //request.body.urgentbadge,
    userid: request.user.uid,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  };

  let advertid = "";

  db.collection("adverts")
    .add(advert)
    .then((doc) => {
      advertid = doc.id;
      advert["advertid"] = doc.id;
      //console.log({ advert });
      return response.json({ advert });
    })
    .catch((err) => {
      response.status(500).json({ error: "something went wrong." });
      console.error(err);
    });
};

exports.getAdvertbyId = (request, response) => {
  //console.log("request.body", request.body);

  let advertid = request.body.advertid;

  db.doc(`/adverts/${advertid}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let advert = { ...doc.data() };
        advert["advertid"] = advertid;
        return response.json({ advert });
      }
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

//uploaad image
exports.uploadAdvertImage = (request, response) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: request.headers });

  let imageFileName;
  let imagetobeUploaded = {};

  let formData = new Map();
  busboy.on("field", function (fieldname, val) {
    formData.set(fieldname, val);
  });

  busboy.on("field", (fieldname, val) => {
    // TODO(developer): Process submitted field values here
    console.log(`Processed field ${fieldname}: ${val}.`);
  });

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

    let advertimageno = formData.get("advertimageno");
    let advertid = formData.get("advertid");

    console.log("imageFileName", imageFileName);
    console.log("advertimageno", advertimageno);
    console.log("advertid", advertid);
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
        console.log(res);
        console.log("imageFileName", imageFileName);
        console.log("imageUrl", imageUrl);
        return db
          .doc(`/adverts/${advertid}`)
          .update({ [`image${advertimageno}Url`]: imageUrl });
      })
      .then(() => {
        return db.doc(`/adverts/${advertid}`).get();
      })
      .then((doc) => {
        if (doc.exists) {
          let advert = { ...doc.data() };
          advert["advertid"] = advertid;
          return response.json({ advert });
        }
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  });

  busboy.end(request.rawBody);
};

exports.deleteAdImage = (request, response) => {
  const imageUrl = request.body.imageUrl;
  const advertid = request.body.advertid;
  const advertimageno = request.body.advertimageno;

  console.log("imageUrl", imageUrl);
  console.log("advertid", advertid);
  console.log("advertimageno", advertimageno);

  const imagename = imageUrl.slice(76, -10);
  const bucket = admin.storage().bucket();

  return bucket
    .file(imagename)
    .delete()
    .then(() => {
      return db
        .doc(`/adverts/${advertid}`)
        .update({ [`image${advertimageno}Url`]: "" });

      console.log(`deleted ${imagename}`);
    })
    .then(() => {
      db.doc(`/adverts/${advertid}`)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let advert = { ...doc.data() };
            advert["advertid"] = advertid;
            return response.json({ advert });
          }
        });
    })
    .catch((err) => {
      console.log("error deleting", err);
      return response.status(500).json({ error: err.code });
    });
};

/* exports.fillAdvertObject = (data) => {
  console.log("fillAdvertObject", data);

  const advert = {
    advertid: data.id,
    address: data.address,
    advertStatus: data.advertStatus,
    adverttype: data.adverttype,
    approvedBy: data.approvedBy ? data.approvedBy : "",
    baths: data.baths ? data.baths : 0,
    beds: data.beds ? data.beds : 0,
    boostadvert: data.boostadvert,
    boostuntil: data.boostuntil,
    category: data.category,
    city: data.city,
    createdBy: data.createdBy,
    description: data.description,
    district: data.disctrict,
    image1Url: data.image1Url,
    image2Url: data.image2Url,
    image3Url: data.image3Url,
    image4Url: data.image4Url,
    image5Url: data.image5Url,
    landtypes: data.landtypes,
    landsize: data.landsize,
    landsizeunit: data.landsizeunit,
    name: data.name,
    paymentStatus: data.paymentStatus,
    phonenumber1: data.phonenumber1,
    phonenumber1verified: data.phonenumber1verified,
    phonenumber2: data.phonenumber2,
    phonenumber2verified: data.phonenumber2verified,
    phonenumber3: data.phonenumber3,
    phonenumber3verified: data.phonenumber3verified,
    phonenumber4: data.phonenumber4,
    phonenumber4verified: data.phonenumber4verified,
    phonenumber5: data.phonenumber5,
    phonenumber5verified: data.phonenumber5verified,
    propertytype: data.propertytype,
    rentaloprice: data.rentaloprice,
    rentalopricenegotiable: data.rentalopricenegotiable,
    rentalopriceunit: data.rentalopriceunit,
    title: data.title,
    urgentbadge: data.urgentbadge,
    createdAt: data.createdAt,
    modifiedAt: data.modifiedAt,
  };
  return advert;
}; */
