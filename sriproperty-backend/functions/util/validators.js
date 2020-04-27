const isEmpty = (str) => {
  if (str.trim() === "") return true;
  else return false;
};

const isvalidEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(emailRegEx)) return true;
  else return false;
};

const isValidPhonenumber = (phonenumber) => {
  const regEx = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  if (phonenumber.match(regEx)) return true;
  else return false;
};

exports.validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isvalidEmail(data.email)) {
    errors.email = "Must be a valid email";
  }

  if (isEmpty(data.phonenumber)) {
    errors.phonenumber = "Must not be empty";
  } else if (!isValidPhonenumber(data.phonenumber)) {
    errors.phonenumber = "Must be a valid Sri Lankan phone number";
  }

  if (isEmpty(data.password)) errors.password = "Must not be empty";

  if (isEmpty(data.name)) errors.name = "Must not be empty";

  if (data.password != data.confirmpassword)
    errors.confirmpassword = "passwords does not match";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateloginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isvalidEmail(data.email)) {
    errors.email = "Must be a valid email";
  }

  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validatePasswordReset = (data) => {
  let errors = {};
  //console.log("validatePasswordReset data", data);
  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isvalidEmail(data.email)) {
    errors.email = "Must be a valid email";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateUpdateUser = (data) => {
  let errors = {};
  //console.log("validateUpdateUser data", data);
  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isvalidEmail(data.email)) {
    errors.email = "Must be a valid email";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
