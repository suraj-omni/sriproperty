/* export const currencyFormat = (amount) => {
  var delimiter = ","; // replace comma if desired
  var a = amount.split(".", 2);
  var d = a[1];
  var i = parseInt(a[0]);
  if (isNaN(i)) {
    return "";
  }
  var minus = "";
  if (i < 0) {
    minus = "-";
  }
  i = Math.abs(i);
  var n = new String(i);
  var a = [];
  while (n.length > 3) {
    var nn = n.substr(n.length - 3);
    a.unshift(nn);
    n = n.substr(0, n.length - 3);
  }
  if (n.length > 0) {
    a.unshift(n);
  }
  n = a.join(delimiter);
  if (d.length < 1) {
    amount = n;
  } else {
    amount = n + "." + d;
  }
  amount = minus + amount;
  return amount;
}; */

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
