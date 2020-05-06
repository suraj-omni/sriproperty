const { admin, db } = require("../util/admin");
const config = require("../util/config");
const types = require("../util/types");
const firebase = require("firebase");

exports.fillAdvert = (data) => {
  let adverts = [];
  data.forEach((doc) => {
    adverts.push({
      advertId: doc.id,
      address: doc.data().address,
      advertStatus: doc.data().advertStatus,
      adminComments: doc.data().adminComments ? doc.data().adminComments : "",
      adverttype: doc.data().adverttype,
      reviewedBy: doc.data().reviewedBy ? doc.data().reviewedBy : "",
      baths: doc.data().baths,
      beds: doc.data().beds,
      boostadvert: doc.data().boostadvert,
      boostuntil: doc.data().boostuntil,
      category: doc.data().category,
      city: doc.data().city,
      createdBy: doc.data().createdBy,
      customerRefNo: doc.data().customerRefNo,
      description: doc.data().description,
      district: doc.data().disctrict,
      email: doc.data().email,
      image1Url: doc.data().image1Url,
      image2Url: doc.data().image2Url,
      image3Url: doc.data().image3Url,
      image4Url: doc.data().image4Url,
      image5Url: doc.data().image5Url,
      landtypes: doc.data().landtypes,
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
      online: doc.data().online ? doc.data().online : false,
      adminComments: doc.data().adminComments ? doc.data().adminComments : "",
      urgentbadge: doc.data().urgentbadge,
      createdAt: doc.data().createdAt,
      modifiedAt: doc.data().modifiedAt,
    });
  });

  return adverts;
};

//get all adverts

exports.getAllAdverts = (req, res) => {
  db.collection("adverts")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let adverts = this.fillAdvert(data);
      return res.json(adverts);
    })
    .catch((err) => console.error(err));
};

//get adverts by user id
exports.getAdvertbyUserId = (req, res) => {
  //console.log(JSON.stringify(req.user));

  const userid = req.user.uid;
  console.log("userid", userid);
  db.collection("adverts")
    .where("userid", "==", userid)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      //console.log("data", data);
      let adverts = this.fillAdvert(data);
      //console.log("userid", userid);
      return res.json(adverts);
    })
    .catch((err) => console.error(err));
};

//Get how mant free ads this month for the user
exports.setFreeAdWhenDeleting = (userid, monthly_free_ads) => {
  const strdate = new Date();
  const firstDay = new Date(strdate.getFullYear(), strdate.getMonth(), 1);
  const lastDay = new Date(
    strdate.getFullYear(),
    strdate.getMonth() + 1,
    0,
    23,
    59
  );

  let advertid = "";
  console.log("userid", userid);
  db.collection("adverts")
    .where("userid", "==", userid)
    .where("paymentStatus", "==", types.PAYMENT_STATUS_FREE)
    .where("createdAt", ">=", firstDay.toISOString())
    .where("createdAt", "<", lastDay.toISOString())
    .orderBy("createdAt", "asc")
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        const this_month_free = snapshot.size;
        const allowedquota = monthly_free_ads;
        if (allowedquota > this_month_free) {
          //this means we can allocate a free ad.
          console.log(
            `allowed quota ${allowedquota} is > this month free ${this_month_free}`
          );
          return true;
        } else {
          // We will not do anything. Quota is finished.
          console.log(
            `allowed quota ${allowedquota} is <= this month free ${this_month_free}`
          );
          return false;
        }
      } else {
        return true;
      }
    })
    .then((canAllocate) => {
      let advertsref = db.collection("adverts");
      if (canAllocate) {
        console.log("inside can allocate");
        return advertsref
          .where("userid", "==", userid)
          .where("paymentStatus", "==", types.PAYMENT_STATUS_NOT_PAID)
          .where("createdAt", ">=", firstDay.toISOString())
          .where("createdAt", "<", lastDay.toISOString())
          .where("advertStatus", "in", [
            types.ADVERT_STATUS_NEW,
            types.ADVERT_STATUS_EDIT,
            types.ADVERT_STATUS_NEEDEDIT,
          ])
          .orderBy("createdAt", "asc")
          .limit(1)
          .get();
      } else {
        console.log("inside can not allocate");
        return advertsref.where("userid", "==", "sddsdsdsds").get();
      }
    })
    .then((snapshot) => {
      if (!snapshot.empty) {
        console.log("snapshot.docs[0].id", snapshot.docs[0].id);
        return (advertid = snapshot.docs[0].id);
      } else {
        console.log("No matching documents.");
        return "";
      }
    })
    .then((advertid) => {
      if (advertid !== "") {
        console.log("Advert id going to free ", JSON.stringify(advertid));
        return db
          .doc(`/adverts/${advertid}`)
          .update({ [`paymentStatus`]: types.PAYMENT_STATUS_FREE });
      } else {
        console.log("No advert was set as free advert.");
      }
    })
    .then(() => {
      console.log(`Successfully reset advert id ${advertid} `);
      //return res.json({ messege: `Successfully reset advert id ${advertid} ` });
    })
    .catch((err) => {
      console.error(err);
      //return res.status(500).json({ error: err.code });
    });
};

exports.adminSearch = (request, response) => {
  const advertStatus = [...request.body.advertStatus];
  const fromDate = request.body.fromDate;
  const toDate = request.body.toDate;
  const sortBy = request.body.sortBy;
  const sortOrder = request.body.sortOrder;

  console.log("advertStatus", advertStatus);
  console.log("fromDate", fromDate);
  console.log("toDate", toDate);
  console.log("sortBy", sortBy);
  console.log("sortOrder", sortOrder);

  db.collection("adverts")
    .where("createdAt", ">=", fromDate)
    .where("createdAt", "<", toDate)
    .where("advertStatus", "in", advertStatus)
    .orderBy(`${sortBy}`, `${sortOrder}`)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return response.status(200).json([]);
      } else {
        let adverts = this.fillAdvert(snapshot);
        return response.status(200).json(adverts);
      }
    })
    .catch((err) => {
      response.status(500).json({ error: "something went wrong." });
      console.error(err);
    });
};

// add advert

exports.addAdvert = (request, response) => {
  console.log("addAvert", JSON.stringify(request.body));
  const strdate = new Date();
  const firstDay = new Date(strdate.getFullYear(), strdate.getMonth(), 1);
  const lastDay = new Date(
    strdate.getFullYear(),
    strdate.getMonth() + 1,
    0,
    23,
    59
  );
  const noImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/blank-profile-picture.jpg?alt=media&token=08cd9281-36dc-41b1-9ed3-d01f7b13fde5";
  let advert = {
    address: request.body.address ? request.body.address : "",
    advertStatus: request.body.advertStatus
      ? request.body.advertStatus
      : types.ADVERT_STATUS_NEW,
    adverttype: request.body.adverttype,
    reviewedBy: "",
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
    landsize: request.body.landsize ? request.body.landsize : 0,
    landsizeunit: request.body.landsizeunit ? request.body.landsizeunit : "",
    paymentStatus: types.PAYMENT_STATUS_NOT_PAID, //request.body.paymentStatus,
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
    online: false,
    adminComments: "",
    name: request.user.name,
    email: request.user.email ? request.user.email : "",
    userImageUrl: request.user.imageUrl ? request.user.imageUrl : noImageUrl,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  };

  let advertid = "";

  db.collection("adverts")
    .where("userid", "==", request.user.uid)
    .where("paymentStatus", "==", types.PAYMENT_STATUS_FREE)
    .where("createdAt", ">=", firstDay.toISOString())
    .where("createdAt", "<", lastDay.toISOString())
    .orderBy("createdAt", "asc")
    .get()
    .then((qsnapshot) => {
      const this_month_free = qsnapshot.size;
      const allowedquota = request.user.monthly_free_ads;
      if (allowedquota > this_month_free) {
        advert["paymentStatus"] = types.PAYMENT_STATUS_FREE;
      } else {
        advert["paymentStatus"] = types.PAYMENT_STATUS_NOT_PAID;
      }
      //console.log("advert 216", advert);
      return advert;
    })
    .then((advert) => {
      return db.doc("/config/advert").get();
    })
    .then((doc) => {
      if (doc.exists) {
        const { currentadvertrefno } = { ...doc.data() };
        advert["customerRefNo"] = currentadvertrefno + 1;
        // console.log("currentadvertrefno", currentadvertrefno);
        return db.collection("adverts").add(advert);
      }
    })
    .then((doc) => {
      console.log("doc.id", doc.id);
      advert["advertid"] = doc.id;
      return advert;
    })
    .then((advert) => {
      const increment = admin.firestore.FieldValue.increment(1);

      const configRef = db.collection("config").doc("advert");
      const batch = db.batch();
      batch.set(configRef, { currentadvertrefno: increment }, { merge: true });
      batch.commit();
      return advert;
    })
    .then((advert) => {
      console.log(JSON.stringify(advert));
      return response.status(200).json({ advert });
    })
    .catch((err) => {
      response.status(500).json({ error: "something went wrong." });
      console.error(err);
    });
};

exports.editAdvert = (request, response) => {
  console.log("Edit Advert", JSON.stringify(request.body));
  //console.log(request.user);
  let advertid = request.body.advertid;
  const advert = {
    address: request.body.address ? request.body.address : "",
    advertStatus: request.body.advertStatus
      ? request.body.advertStatus
      : types.ADVERT_STATUS_EDIT,
    adverttype: request.body.adverttype,
    approvedBy: request.body.approvedBy ? request.body.approvedBy : "",
    baths: request.body.baths ? request.body.baths : 0,
    beds: request.body.beds ? request.body.beds : 0,
    boostadvert: request.body.boostadvert ? request.body.boostadvert : false,
    boostuntil: request.body.boostuntil ? request.body.boostuntil : "",
    category: request.body.category,
    city: request.body.city,
    description: request.body.description,
    district: request.body.district,
    landtypes: request.body.landtypes ? request.body.landtypes : "",
    landsize: request.body.landsize ? request.body.landsize : 0,
    landsizeunit: request.body.landsizeunit ? request.body.landsizeunit : "",
    name: request.user.name,
    paymentStatus: request.body.paymentStatus
      ? request.body.paymentStatus
      : "not paid",
    phonenumber1: request.user.phonenumber, // request.body.phonenumber1,
    phonenumber1verified: request.body.phonenumber1verified
      ? request.body.phonenumber1verified
      : false,
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
    modifiedAt: new Date().toISOString(),
    online: false,
  };

  db.doc(`/adverts/${advertid}`)
    .update(advert)
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

exports.deleteAdvert = (request, response) => {
  let advertid = request.params.advertid;
  const document = db.doc(`/adverts/${advertid}`);
  const bucket = admin.storage().bucket();

  //console.log("advertid", advertid);
  let paymentStatus = "";
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response
          .status(404)
          .json({ error: "No Such Advert to Delete !!!" });
      } else if (doc.data().userid != request.user.uid) {
        return response.status(403).json({ error: "Unauthorized Action !!!" });
      } else {
        paymentStatus = doc.data()["paymentStatus"];
        //console.log("paymentStatus", paymentStatus);

        for (i = 1; i < 6; i++) {
          //delete each image here.
          const imageUrl = doc.data()[`image${i}Url`];
          //console.log("imageUrl", imageUrl);
          if (imageUrl !== "") {
            const imagename = imageUrl.slice(76, -10);
            // console.log("imagename", imagename);
            bucket
              .file(imagename)
              .delete()
              .then(() => {
                console.log(imagename + " deleted");
              });
          }
        }

        return document.delete();
      }
    })
    .then(() => {
      if (paymentStatus === types.PAYMENT_STATUS_FREE) {
        //console.log("paymentStatus === types.PAYMENT_STATUS_FREE");
        this.setFreeAdWhenDeleting(
          request.user.uid,
          request.user.monthly_free_ads
        );
      }
      return response.status(200).json({ message: `Successfully Deleted !!!` });
    })
    .catch((err) => {
      console.log("error deleting", err);
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
    //console.log(`Processed field ${fieldname}: ${val}.`);
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

    //console.log("imageFileName", imageFileName);
    //console.log("advertimageno", advertimageno);
    //console.log("advertid", advertid);
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
        //console.log(res);
        //console.log("imageFileName", imageFileName);
        //console.log("imageUrl", imageUrl);
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

      //console.log(`deleted ${imagename}`);
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
