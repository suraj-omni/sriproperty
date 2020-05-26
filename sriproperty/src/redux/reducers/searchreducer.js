import {
  LOAD_ADVERT_LOCATION_TOTAL,
  SEARCH_START,
  SEARCH_LOADED,
  SET_SEARCH_PARAMS,
  SET_SEARCH_NORECORDS,
  CLEAR_SEARCH_PARAMS,
} from "../types";

const initialState = {
  allsearchedadverts: [],
  allshowingadverts: [],
  showingadverts: [],
  districtslist: [],
  advertlocationtotal: [],
  searchedadvertscount: 0,
  after: 0,
  more: false,
  paramDistrict: "",
  paramCity: "",
  paramCategory: [],
  paramAdType: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ADVERT_LOCATION_TOTAL:
      return {
        ...state,
        advertlocationtotal: action.advertlocationtotal,
        districtslist: action.districtslist,
      };
    case SEARCH_START:
      return {
        ...state,
        allsearchedadverts: action.allsearchedadverts,
        allshowingadverts: action.allshowingadverts,
        showingadverts: action.showingadverts,
        searchedadvertscount: action.searchedadvertscount,
        after: action.after,
        paramDistrict: action.paramDistrict,
        paramCategory: action.paramCategory,
        more: true,
      };
    case SEARCH_LOADED:
      return {
        ...state,
        showingadverts: action.showingadverts,
        more: action.more,
        after: action.after,
      };
    case SET_SEARCH_NORECORDS:
      return {
        ...state,
        more: false,
        paramDistrict: action.paramDistrict,
        paramCategory: action.paramCategory,
        allsearchedadverts: action.allsearchedadverts,
        showingadverts: action.showingadverts,
        more: action.more,
      };
    case SET_SEARCH_PARAMS:
      return {
        ...state,
        paramDistrict: action.paramDistrict,
        paramCategory: action.paramCategory,
      };
    case "SORT_SEARCHED_DATA":
      return {
        ...state,
        allshowingadverts: action.allshowingadverts,
        showingadverts: action.showingadverts,
        after: action.after,
        more: true,
      };
    case "FILTER_BY_CITY":
      return {
        ...state,
        allshowingadverts: action.allshowingadverts,
        showingadverts: action.showingadverts,
        searchedadvertscount: action.searchedadvertscount,
        after: action.after,
        more: action.more,
        paramDistrict: action.paramDistrict,
        paramCategory: action.paramCategory,
      };

    case CLEAR_SEARCH_PARAMS:
      return {
        initialState,
      };
    default:
      return { ...state };
  }
}
