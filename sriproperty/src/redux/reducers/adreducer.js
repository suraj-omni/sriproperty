import {
  NEW_AD,
  INITIATE_AD,
  SET_TYPE,
  SET_CATEGORY,
  SAVE_NEWAD,
  SET_AD_FROM_INTERNAL_DB,
  SET_ADS_BY_USER,
} from "../types";

const initialState = {
  adInitiated: false,
  adtypeset: false,
  adcategoryset: false,
  advert: {},
  adverts: [],
  loadingadvert: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_AD:
      return initialState;
    case INITIATE_AD:
      return { ...state, adInitiated: true };
    case SET_TYPE:
      return {
        ...state,
        adtypeset: true,
        ...action.payload,
      };
    case SET_CATEGORY:
      return {
        ...state,
        adcategoryset: true,
        ...action.payload,
      };
    case SAVE_NEWAD:
      return {
        ...state,
        ...action.payload,
      };
    case SET_ADS_BY_USER:
      return {
        ...state,
        adverts: action.payload,
      };
    case SET_AD_FROM_INTERNAL_DB:
      return {
        ...state,
        advert: action.payload,
      };
    default:
      return state;
  }
}
