import config from "./config";

export const currencyFormat = (amount) => {
  var i = parseFloat(amount);
  if (isNaN(i)) {
    i = 0.0;
  }
  var minus = "";
  if (i < 0) {
    minus = "-";
  }
  i = Math.abs(i);
  i = parseInt((i + 0.005) * 100);
  i = i / 100;
  let s = new String(i);
  if (s.indexOf(".") < 0) {
    s += ".00";
  }
  if (s.indexOf(".") == s.length - 2) {
    s += "0";
  }
  s = minus + s;
  return s;
};

export const altPhoneNumber = (phonenumber) => {
  if (phonenumber) {
    var str = phonenumber;
    var res = str.slice(0, -3);
    res = res + "###";
    return res;
  }
};

export const getimageUrllist = (advert) => {
  let images = [];
  const { image1Url, image2Url, image3Url, image4Url, image5Url } = {
    ...advert,
  };

  const emptyImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/no-image-icon.png?alt=media";

  image1Url === ""
    ? images.push({ original: emptyImageUrl, thumbnail: emptyImageUrl })
    : images.push({ original: image1Url, thumbnail: image1Url });

  if (image2Url !== "") {
    images.push({ original: image2Url, thumbnail: image2Url });
  }
  if (advert.image3Url !== "") {
    images.push({ original: image3Url, thumbnail: image3Url });
  }
  if (advert.image4Url !== "") {
    images.push({ original: image4Url, thumbnail: image4Url });
  }
  if (advert.image5Url !== "") {
    images.push({ original: image5Url, thumbnail: image5Url });
  }

  return images;
};

export function convertArraytoKeyPair(array) {
  if (array === undefined || array.length === 0) {
    return null;
  }
  let returnlist = [];

  array.map((obj) => {
    returnlist.push({ value: `${obj}`, label: `${obj}` });
  });
  return returnlist;
}

export const getCitiesbasedonDistrict = (selecteddistrict) => {
  switch (selecteddistrict) {
    case "Ampara":
      return convertArraytoKeyPair(config.amparaCities);
    case "Anuradhapura":
      return convertArraytoKeyPair(config.anuradhapuraCities);
    case "Badulla":
      return convertArraytoKeyPair(config.badullaCities);
    case "Batticaloa":
      return convertArraytoKeyPair(config.batticaloaCities);
    case "Colombo":
      return convertArraytoKeyPair(config.colomboCities);
    case "Galle":
      return convertArraytoKeyPair(config.galleCities);
    case "Gampaha":
      return convertArraytoKeyPair(config.gampahaCities);
    case "Hambantota":
      return convertArraytoKeyPair(config.hambantotaCities);
    case "Jaffna":
      return convertArraytoKeyPair(config.jaffnaCities);
    case "Kalutara":
      return convertArraytoKeyPair(config.kalutaraCities);
    case "Kandy":
      return convertArraytoKeyPair(config.kandyCities);
    case "Kegalle":
      return convertArraytoKeyPair(config.kegalleCities);
    case "Kilinochchi":
      return convertArraytoKeyPair(config.kilinochchiCities);
    case "Kurunegala":
      return convertArraytoKeyPair(config.kurunegalaCities);
    case "Mannar":
      return convertArraytoKeyPair(config.mannarCities);
    case "Matale":
      return convertArraytoKeyPair(config.mataleCities);
    case "Matara":
      return convertArraytoKeyPair(config.mataraCities);
    case "Monaragala":
      return convertArraytoKeyPair(config.monaragalaCities);
    case "Mullaitivu":
      return convertArraytoKeyPair(config.mullativuCities);
    case "Nuwara Eliya":
      return convertArraytoKeyPair(config.nuwaraeliyaCities);
    case "Polonnaruwa":
      return convertArraytoKeyPair(config.polonnaruwaCities);
    case "Puttalam":
      return convertArraytoKeyPair(config.puttalamCities);
    case "Ratnapura":
      return convertArraytoKeyPair(config.ratnapuraCities);
    case "Trincomalee":
      return convertArraytoKeyPair(config.trincomaleeCities);
    case "Vavuniya":
      return convertArraytoKeyPair(config.vavuniyaCities);
    default:
      return convertArraytoKeyPair(config.vavuniyaCities);
  }
};
