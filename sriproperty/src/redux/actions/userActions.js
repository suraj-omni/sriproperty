import {
  SET_ERRORS,
  SET_USER,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_MSG,
  DISABLE_BTN,
  LOADING_UPDATEUSER_UI,
  LOADING_UPLOAD_USER_IMAGE_UI,
  FINISHED_LOADING_RESET_EMAIL_UI,
  LOADING_RESET_EMAIL_UI,
} from "../types";

import axios from "axios";

//login user
export const loginUser = (loginuserdata, state) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/login", loginuserdata)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });

      if (state) {
        window.location = state.from.pathname;
      } else {
        window.location.assign("/");
      }
    })
    .catch((err) => {
      //console.log("user actions err", err.response.data);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logOutUser = (history) => (dispatch) => {
  localStorage.removeItem("FBIDToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  if (history) history.push("/");
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_UPDATEUSER_UI });
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then((res) => {
      dispatch({
        type: SET_MSG,
        payload: res.data,
      });
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendResetPasswordEmail = () => (dispatch) => {
  dispatch({ type: LOADING_RESET_EMAIL_UI });
  axios
    .post("/user/sendResetPasswordEmail")
    .then((res) => {
      dispatch({
        type: SET_MSG,
        payload: res.data,
      });
      dispatch({
        type: DISABLE_BTN,
      });
      dispatch({ type: FINISHED_LOADING_RESET_EMAIL_UI });

      //console.log("res.data", res.data);
    })
    .catch((err) => console.log("sendResetPasswordEmail", err));
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      //console.log("getUserData", JSON.stringify(res.data));
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log("getUserData", err));
};

// sign up user
export const signupuser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/signup", newUserData)
    .then((res) => {
      console.log("res.data", res.data.tokenId);
      setAuthorizationHeader(res.data.tokenId);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      //console.log("user actions err", err.response.data);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  dispatch({ type: LOADING_UPLOAD_USER_IMAGE_UI });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
    });
};

const setAuthorizationHeader = (token) => {
  //console.log("token", token);
  const FBIDToken = `Bearer ${token}`;
  localStorage.setItem("FBIDToken", FBIDToken);
  axios.defaults.headers.common["Authorization"] = FBIDToken;
};
