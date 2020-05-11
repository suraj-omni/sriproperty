import {
  NEW_AD,
  INITIATE_AD,
  SET_TYPE,
  SET_CATEGORY,
  SAVE_AD,
  SET_AD,
  SET_ADS_BY_USER,
  SET_ADVERTS_COUNT,
  GET_ALL_ADVERTS,
  GET_ADVERTPAYMENT,
  SAVE_ADVERTPAYMENT,
  SET_ADVERTPAYMENT,
} from "../types";

import { loadState } from "../localStorage";

const initialState = {
  adInitiated: false,
  adtypeset: false,
  adcategoryset: false,
  advert: {},
  adverts: [],
  alladverts: [],
  advertpayment: {},
  advertscount: 0,
  loadingadvert: false,
  after: 0,
  more: true,
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
        advert: action.payload,
      };
    case SET_CATEGORY:
      return {
        ...state,
        adcategoryset: true,
        advert: action.payload,
        ...action.payload,
      };
    case SAVE_AD:
      return {
        ...state,
        advert: action.payload,
        ...action.payload,
      };
    case SET_ADS_BY_USER:
      return {
        ...state,
        adverts: action.payload,
        advertscount: action.advertscount,
      };
    case GET_ALL_ADVERTS:
      return {
        ...state,
        adverts: action.payload,
        advertscount: action.advertscount,
      };
    case SET_ADVERTS_COUNT:
      return {
        ...state,
        advertscount: action.advertscount,
      };
    case SET_AD:
      return {
        ...state,
        advert: action.payload,
      };
    case SAVE_ADVERTPAYMENT:
      return {
        ...state,
        advertpayment: action.payload,
      };
    case GET_ADVERTPAYMENT:
      return {
        ...state,
        advertpayment: action.payload,
      };
    case SET_ADVERTPAYMENT:
      return {
        ...state,
        advertpayment: action.payload,
      };
    case "START":
      return {
        ...state,
        alladverts: action.alladverts,
        adverts: action.adverts,
        advertscount: action.advertscount,
        after: action.after,
      };
    case "LOADED":
      return {
        ...state,
        adverts: action.adverts,
        more: action.more,
        after: action.after,
      };
    default:
      return { ...state, advert: loadState() };
  }
}
