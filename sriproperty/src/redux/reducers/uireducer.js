import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  FINISHED_LOADING_UI,
  SET_MSG,
  CLEAR_MSG,
  DISABLE_BTN,
  ENABLE_BTN,
  LOADING_UPDATEUSER_UI,
  LOADING_UPLOAD_USER_IMAGE_UI,
  UPLOADING_IMAGE,
  UPLOADDONE_IMAGE,
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
} from "../types";

const initialState = {
  loading: false,
  inprogress1: false,
  inprogress2: false,
  inprogress3: false,
  inprogress4: false,
  inprogress5: false,
  deletingimage1: false,
  deletingimage2: false,
  deletingimage3: false,
  deletingimage4: false,
  deletingimage5: false,
  loadingresetemail: false,
  loadingupdateuser: false,
  loadinguploeaduserimage: false,
  uploadingadimage: false,
  disablebutton: false,
  errors: null,
  msgs: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        loadingresetemail: false,
        errors: action.payload,
      };
    case SET_MSG:
      return {
        ...state,
        loading: false,
        loadingresetemail: false,
        loadingupdateuser: false,
        loadinguploeaduserimage: false,
        msgs: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        loadingresetemail: false,
        loadinguploeaduserimage: false,
        errors: null,
      };
    case DISABLE_BTN:
      return {
        ...state,
        disablebutton: true,
      };
    case ENABLE_BTN:
      return {
        ...state,
        disablebutton: false,
      };
    case CLEAR_MSG:
      return {
        ...state,
        loading: false,
        loadingresetemail: false,
        loadinguploeaduserimage: false,
        msgs: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
        loadingresetemail: true,
      };
    case FINISHED_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case LOADING_UPDATEUSER_UI:
      return {
        ...state,
        loading: true,
        loadingupdateuser: true,
      };
    case LOADING_UPLOAD_USER_IMAGE_UI:
      return {
        ...state,
        loading: true,
        loadinguploeaduserimage: true,
      };
    case INPROGRESS1:
      return {
        ...state,
        inprogress1: true,
      };
    case INPROGRESS2:
      return {
        ...state,
        inprogress2: true,
      };
    case INPROGRESS3:
      return {
        ...state,
        inprogress3: true,
      };
    case INPROGRESS4:
      return {
        ...state,
        inprogress4: true,
      };
    case INPROGRESS5:
      return {
        ...state,
        inprogress5: true,
      };
    case PROCESSCOMPLETED1:
      return {
        ...state,
        inprogress1: false,
      };
    case PROCESSCOMPLETED2:
      return {
        ...state,
        inprogress2: false,
      };
    case PROCESSCOMPLETED3:
      return {
        ...state,
        inprogress3: false,
      };
    case PROCESSCOMPLETED4:
      return {
        ...state,
        inprogress4: false,
      };
    case PROCESSCOMPLETED5:
      return {
        ...state,
        inprogress5: false,
      };
    case DELETE_IMAGE_INPROGRESS1:
      return {
        ...state,
        deletingimage1: true,
      };
    case DELETE_IMAGE_INPROGRESS2:
      return {
        ...state,
        deletingimage2: true,
      };
    case DELETE_IMAGE_INPROGRESS3:
      return {
        ...state,
        deletingimage3: true,
      };
    case DELETE_IMAGE_INPROGRESS4:
      return {
        ...state,
        deletingimage4: true,
      };
    case DELETE_IMAGE_INPROGRESS5:
      return {
        ...state,
        deletingimage5: true,
      };
    case DELETE_IMAGE_COMPLETED1:
      return {
        ...state,
        deletingimage1: false,
      };
    case DELETE_IMAGE_COMPLETED2:
      return {
        ...state,
        deletingimage2: false,
      };
    case DELETE_IMAGE_COMPLETED3:
      return {
        ...state,
        deletingimage3: false,
      };
    case DELETE_IMAGE_COMPLETED4:
      return {
        ...state,
        deletingimage4: false,
      };
    case DELETE_IMAGE_COMPLETED5:
      return {
        ...state,
        deletingimage5: false,
      };
    case UPLOADING_IMAGE:
      return {
        ...state,
        loading: true,
        uploadingadimage: true,
      };
    case UPLOADDONE_IMAGE:
      return {
        ...state,
        loading: false,
        uploadingadimage: false,
      };
    default:
      return state;
  }
}
