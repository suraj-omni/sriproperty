import {
  NEW_AD,
  INITIATE_AD,
  SET_TYPE,
  SET_ERRORS,
  SET_CATEGORY,
  LOADING_UI,
  FINISHED_LOADING_UI,
  SAVE_AD,
  SET_AD,
  INPROGRESS1,
  INPROGRESS2,
  INPROGRESS3,
  INPROGRESS4,
  INPROGRESS5,
  PROCESSCOMPLETED1,
  PROCESSCOMPLETED2,
  PROCESSCOMPLETED3,
  PROCESSCOMPLETED4,
  PROCESSCOMPLETED5,
  DELETE_IMAGE_INPROGRESS1,
  DELETE_IMAGE_INPROGRESS2,
  DELETE_IMAGE_INPROGRESS3,
  DELETE_IMAGE_INPROGRESS4,
  DELETE_IMAGE_INPROGRESS5,
  DELETE_IMAGE_COMPLETED1,
  DELETE_IMAGE_COMPLETED2,
  DELETE_IMAGE_COMPLETED3,
  DELETE_IMAGE_COMPLETED4,
  DELETE_IMAGE_COMPLETED5,
  CLEAR_ERRORS,
  SET_ADS_BY_USER,
  DISABLE_BTN,
  ENABLE_BTN,
  SET_ADVERTS_COUNT,
} from "../types";

import axios from "axios";
import Joi from "joi-browser";

export const schemaland = Joi.object().keys({
  adverttype: Joi.string().required().label("Ad Type"),
  advertStatus: Joi.string().required(),
  category: Joi.string().required().label("Category"),
  rentalopricenegotiable: Joi.boolean().label("Negotiable"),
  district: Joi.string().required().label("District"),
  city: Joi.string().required().label("City"),
  address: Joi.string().allow("").optional().label("Address"),
  title: Joi.string()
    .regex(/^([a-zA-Z0-9 \._-]+)$/)
    .required()
    .min(10)
    .max(100)
    .options({
      language: {
        any: {
          empty: " is required",
          required: " is required",
        },
        string: {
          min: "should have atleast 10 characters",
          regex: {
            base:
              "cannot have special characters like & % ^ etc... Only allowed dash and dot(- .)",
          },
        },
      },
    })
    .label("Title"),
  landsizeunit: Joi.string().required().label("Land size unit"),
  landtypes: Joi.string().required().label("Land Types"),
  landsize: Joi.number()
    .positive()
    .min(0.1)
    .max(100000)
    .required()
    .label("Land Size"),
  description: Joi.string().required().min(25).max(5000).label("Description"),
  rentaloprice: Joi.number()
    .positive()
    .precision(2)
    .min(1000)
    .max(1000000000)
    .required()
    .label("Price"),
  rentalopriceunit: Joi.string().required().label("Price unit"),
});

export const schemahouse = Joi.object().keys({
  adverttype: Joi.string().required().label("Ad Type"),
  advertStatus: Joi.string().required(),
  category: Joi.string().required().label("Category"),
  rentalopricenegotiable: Joi.boolean().label("Negotiable"),
  district: Joi.string().required().label("District"),
  landsizeunit: Joi.string().required().label("Land size unit"),
  city: Joi.string().required().label("City"),
  address: Joi.string().allow("").optional().label("Address"),
  title: Joi.string()
    .regex(/^([a-zA-Z0-9 \._-]+)$/)
    .required()
    .min(10)
    .max(100)
    .options({
      language: {
        any: {
          empty: " is required",
          required: " is required",
        },
        string: {
          min: "should have atleast 10 characters",
          regex: {
            base:
              "cannot have special characters like & % ^ etc... Only allowed dash and dot(- .)",
          },
        },
      },
    })
    .label("Title"),
  beds: Joi.string().required().label("No of Bedrooms"),
  baths: Joi.string().required().label("No of Bathrooms"),
  size: Joi.string().required().label("Size"),
  landsize: Joi.number()
    .positive()
    .min(0.1)
    .max(100000)
    .required()
    .label("Land Size"),
  description: Joi.string().required().min(25).max(5000).label("Description"),
  rentaloprice: Joi.number()
    .positive()
    .precision(2)
    .min(1000)
    .max(1000000000)
    .required()
    .label("Price"),
  rentalopriceunit: Joi.string().required().label("Price unit"),
});

export const schemaApartment = Joi.object().keys({
  adverttype: Joi.string().required().label("Ad Type"),
  advertStatus: Joi.string().required(),
  category: Joi.string().required().label("Category"),
  rentalopricenegotiable: Joi.boolean().label("Negotiable"),
  district: Joi.string().required().label("District"),
  city: Joi.string().required().label("City"),
  address: Joi.string().allow("").optional().label("Address"),
  title: Joi.string()
    .regex(/^([a-zA-Z0-9 \._-]+)$/)
    .required()
    .min(10)
    .max(100)
    .options({
      language: {
        any: {
          empty: " is required",
          required: " is required",
        },
        string: {
          min: "should have atleast 10 characters",
          regex: {
            base:
              "cannot have special characters like & % ^ etc... Only allowed dash and dot(- .)",
          },
        },
      },
    })
    .label("Title"),
  beds: Joi.string().required().label("No of Bedrooms"),
  baths: Joi.string().required().label("No of Bathrooms"),
  size: Joi.string().required().label("Size"),
  description: Joi.string().required().min(25).max(5000).label("Description"),
  rentaloprice: Joi.number()
    .positive()
    .precision(2)
    .min(1000)
    .max(1000000000)
    .required()
    .label("Price"),
  rentalopriceunit: Joi.string().required().label("Price unit"),
});

export const schemaCommercialProperty = Joi.object().keys({
  adverttype: Joi.string().required().label("Ad Type"),
  advertStatus: Joi.string().required(),
  category: Joi.string().required().label("Category"),
  rentalopricenegotiable: Joi.boolean().label("Negotiable"),
  district: Joi.string().required().label("District"),
  city: Joi.string().required().label("City"),
  address: Joi.string().allow("").optional().label("Address"),
  title: Joi.string()
    .regex(/^([a-zA-Z0-9 \._-]+)$/)
    .required()
    .min(10)
    .max(100)
    .options({
      language: {
        any: {
          empty: " is required",
          required: " is required",
        },
        string: {
          min: "should have atleast 10 characters",
          regex: {
            base:
              "cannot have special characters like & % ^ etc... Only allowed dadash and dotsh(- .)",
          },
        },
      },
    })
    .label("Title"),
  size: Joi.number().required().label("Size"),
  propertytype: Joi.string().required().label("Property Type"),
  description: Joi.string().required().min(25).max(5000).label("Description"),
  rentaloprice: Joi.number()
    .positive()
    .precision(2)
    .min(1000)
    .max(1000000000)
    .required()
    .label("Price"),
  rentalopriceunit: Joi.string().required().label("Price unit"),
});

export const schema = Joi.object().keys({
  adverttype: Joi.string().required().label("Ad Type"),
  advertStatus: Joi.string().required(),
  category: Joi.string().required().label("Category"),
  rentalopricenegotiable: Joi.boolean().label("Negotiable"),
  district: Joi.string().required().label("District"),
  city: Joi.string().required().label("City"),
  address: Joi.string().allow("").optional().label("Address"),
  title: Joi.string()
    .regex(/^([a-zA-Z0-9 \._-]+)$/)
    .required()
    .min(10)
    .max(100)
    .options({
      language: {
        any: {
          empty: " is required",
          required: " is required",
        },
        string: {
          min: "should have atleast 10 characters",
          regex: {
            base:
              "cannot have special characters like & % ^ etc... Only allowed dash and dot(- .)",
          },
        },
      },
    })
    .label("Title"),
  beds: Joi.string().required().label("No of Bedrooms"),
  baths: Joi.string().required().label("No of Bathrooms"),
  propertytype: Joi.string().required().label("Property Type"),
  description: Joi.string().required().min(25).max(5000).label("Description"),
  rentaloprice: Joi.number()
    .positive()
    .precision(2)
    .min(1000)
    .max(1000000000)
    .required()
    .label("Price"),
  rentalopriceunit: Joi.string().optional().label("Unit of Price"),
});

export const schemaall = {
  adverttype: Joi.string().required().label("Ad Type"),
  advertStatus: Joi.string().required(),
  category: Joi.string().required().label("Category"),
  rentalopricenegotiable: Joi.boolean().label("Negotiable"),
  district: Joi.string().required().label("District"),
  city: Joi.string().required().label("City"),
  address: Joi.string().allow("").optional().label("Address"),
  title: Joi.string()
    .regex(/^([a-zA-Z0-9 \._-]+)$/)
    .min(10)
    .max(100)
    .required()
    .options({
      language: {
        any: {
          empty: " is required",
          required: " is required",
        },
        string: {
          min: "should have atleast 10 characters",
          regex: {
            base:
              "cannot have special characters like & % ^ etc... Only allowed dash(-)",
          },
        },
      },
    })
    .label("Title"),
  beds: Joi.string().required().label("No of Bedrooms"),
  baths: Joi.string().required().label("No of Bathrooms"),
  size: Joi.string().required().label("Size"),
  landsizeunit: Joi.string().required().label("Land size unit"),
  landtypes: Joi.string().required().label("Land Types"),
  propertytype: Joi.string().required().label("Property Type"),
  landsize: Joi.number()
    .positive()
    .min(0.1)
    .max(100000)
    .required()
    .label("Land Size"),
  description: Joi.string().required().min(25).max(5000).label("Description"),
  rentaloprice: Joi.number()
    .positive()
    .precision(2)
    .min(1000)
    .max(1000000000)
    .required()
    .label("Price"),
  rentalopriceunit: Joi.string().required().label("Price unit"),
};

export const validate = (advert) => {
  const opt = { abortEarly: false, stripUnknown: true };
  let error;
  let errors = {};

  if (advert.category === "Land") {
    const { error: err1 } = Joi.validate(advert, schemaland, opt);
    error = { ...err1 };
  } else if (advert.category === "House") {
    const { error: err2 } = Joi.validate(advert, schemahouse, opt);
    error = { ...err2 };
  } else if (advert.category === "Apartment") {
    const { error: err2 } = Joi.validate(advert, schemaApartment, opt);
    error = { ...err2 };
  } else if (advert.category === "Commercial Property") {
    const { error: err2 } = Joi.validate(advert, schemaCommercialProperty, opt);
    error = { ...err2 };
  } else {
    const { error: err2 } = Joi.validate(advert, schema, opt);
    error = { ...err2 };
  }

  console.log(error);
  if (error && error.details) {
    const items = error.details.map((item) => {
      errors[item.path[0]] = item.message;
    });

    console.log(errors);

    return errors;
  } else {
    return null;
  }
};

export const validateAdvertProperty = (name, value, errors) => (dispatch) => {
  //object that need to validate
  const obj = { [name]: value };

  //portion of the schema which w
  const schema = { [name]: schemaall[name] };
  const { error } = Joi.validate(obj, schema);
  //console.log("single error", JSON.stringify(error));
  if (error && error.details) {
    errors[name] = error.details[0].message;
  } else {
    delete errors[name];
  }
  //console.log(JSON.stringify(errors));

  if (errors) {
    dispatch({ type: SET_ERRORS, payload: errors });
  }
};

export const clearErrosPageLoad = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const InitiateAd = (advert, history) => (dispatch) => {
  dispatch({ type: NEW_AD });
  dispatch({ type: INITIATE_AD });
  dispatch({ type: SET_TYPE, payload: advert });
  history.push("/postad/category");
};

export const setCategory = (advert, history) => (dispatch) => {
  console.log("setCategory", JSON.stringify(advert));
  dispatch({ type: SET_CATEGORY, payload: advert });
  //console.log("setCategory", JSON.stringify(advert));
  history.push("/postad/details");
};

export const setAdvert = (advert) => (dispatch) => {
  //console.log("setAdvert", JSON.stringify(advert));
  dispatch({ type: LOADING_UI });
  dispatch({ type: SET_AD, payload: advert });
  dispatch({ type: FINISHED_LOADING_UI });
};

export const resetAdverts = (adverts) => (dispatch) => {
  let advertscount = adverts && adverts.length ? adverts.length : 0;
  console.log("resetAdverts :-", advertscount);
  dispatch({ type: LOADING_UI });
  dispatch({
    type: SET_ADS_BY_USER,
    payload: adverts,
    advertscount: advertscount,
  });
  dispatch({ type: FINISHED_LOADING_UI });
};

export const IsvalidAdvert = (newAdvert) => (dispatch) => {
  const errors = validate(newAdvert);
  if (errors) {
    dispatch({ type: SET_ERRORS, payload: errors });
    return false;
  } else return true;
};

// Add New Advert
export const addAdvert = (newAdvert, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log("addAdvert before save newAdvert", newAdvert);
  axios
    .post("/advert", newAdvert)
    .then((res) => {
      let { advert } = { ...res.data };

      console.log("addAdvert after save newAdvert", advert);
      dispatch({ type: SAVE_AD, payload: advert });
      dispatch({ type: FINISHED_LOADING_UI });
      history.push("/postad/uploadimage");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Edit Advert
export const editAdvert = (advert, history, redirectto) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log("editAdvert before save advert", JSON.stringify(advert));
  axios
    .post("/advertedit", advert)
    .then((res) => {
      let { advert } = { ...res.data };
      console.log("editAdvert after save advert", JSON.stringify(advert));
      dispatch({ type: SAVE_AD, payload: advert });
      dispatch({ type: FINISHED_LOADING_UI });
      history.push(`${redirectto}`);
    })
    .catch((err) => {
      console.log(err);
      /* dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      }); */
    });
};

// Get Advert by Advert Id
export const getAdvertbyId = (advert) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/advertbyid", advert)
    .then((res) => {
      let { advert } = { ...res.data };
      dispatch({ type: SET_AD, payload: advert });
      dispatch({ type: FINISHED_LOADING_UI });
      return advert;
    })
    .catch((err) => {
      console.log("getAdvertbyId", err);
      /* dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      }); */
    });
};

// Delte Advert
export const deleteAdvert = (advertid) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/advert/${advertid}`)
    .then((res) => {
      dispatch({ type: FINISHED_LOADING_UI });
    })
    .catch((err) => {
      console.log("deleteAdvert", err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Get Adverts by user Id
export const getAdvertsbyUserId = () => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get("/advertsbyUserid")
    .then((res) => {
      let adverts = [...res.data];
      let advertscount = adverts && adverts.length ? adverts.length : 0;
      dispatch({
        type: SET_ADS_BY_USER,
        payload: adverts,
        advertscount: advertscount,
      });
      //console.log("getAdvertsbyUserId", adverts);
      dispatch({ type: FINISHED_LOADING_UI });
      console.log("advert countdf dfd:-", advertscount);
      return adverts;
    })
    .catch((err) => {
      console.log("getAdvertsbyUserId", err);
      /* dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      }); */
    });
};

export const uploadAdImage = (formData, imageno) => (dispatch) => {
  dispatch({ type: DISABLE_BTN });

  switch (imageno) {
    case 1:
      dispatch({ type: INPROGRESS1 });
      break;
    case 2:
      dispatch({ type: INPROGRESS2 });
      break;
    case 3:
      dispatch({ type: INPROGRESS3 });
      break;
    case 4:
      dispatch({ type: INPROGRESS4 });
      break;
    case 5:
      dispatch({ type: INPROGRESS5 });
      break;
  }

  const config = { headers: { "Content-Type": "multipart/form-data" } };
  axios
    .post("/advert/image", formData, config)
    .then((res) => {
      let { advert } = { ...res.data };
      dispatch({ type: SET_AD, payload: advert });

      switch (imageno) {
        case 1:
          dispatch({ type: PROCESSCOMPLETED1 });
          break;
        case 2:
          dispatch({ type: PROCESSCOMPLETED2 });
          break;
        case 3:
          dispatch({ type: PROCESSCOMPLETED3 });
          break;
        case 4:
          dispatch({ type: PROCESSCOMPLETED4 });
          break;
        case 5:
          dispatch({ type: PROCESSCOMPLETED5 });
          break;
      }
      dispatch({ type: ENABLE_BTN });
      return advert;
    })
    .catch((err) => {
      console.log(err);
      alert("An Error occured. Please retry.");
    });
};

// Get Delete Ad Image
export const deleteAdImage = (deleteadvert) => (dispatch) => {
  dispatch({ type: DISABLE_BTN });
  switch (deleteadvert.advertimageno) {
    case 1:
      dispatch({ type: DELETE_IMAGE_INPROGRESS1 });
      break;
    case 2:
      dispatch({ type: DELETE_IMAGE_INPROGRESS2 });
      break;
    case 3:
      dispatch({ type: DELETE_IMAGE_INPROGRESS3 });
      break;
    case 4:
      dispatch({ type: DELETE_IMAGE_INPROGRESS4 });
      break;
    case 5:
      dispatch({ type: DELETE_IMAGE_INPROGRESS5 });
      break;
  }

  axios
    .post("/advert/imagedelete", deleteadvert)
    .then((res) => {
      let { advert } = { ...res.data };
      console.log("deleteAdImage", JSON.stringify(advert));
      dispatch({ type: SET_AD, payload: advert });

      switch (deleteadvert.advertimageno) {
        case 1:
          dispatch({ type: DELETE_IMAGE_COMPLETED1 });
          break;
        case 2:
          dispatch({ type: DELETE_IMAGE_COMPLETED2 });
          break;
        case 3:
          dispatch({ type: DELETE_IMAGE_COMPLETED3 });
          break;
        case 4:
          dispatch({ type: DELETE_IMAGE_COMPLETED4 });
          break;
        case 5:
          dispatch({ type: DELETE_IMAGE_COMPLETED5 });
          break;
      }
      dispatch({ type: ENABLE_BTN });
    })
    .catch((err) => {
      console.log("deleteAdImage", err);
      alert("An Error occured. Please retry.");
      /* dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      }); */
    });
};
