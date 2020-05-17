import { LOAD_ADVERT_LOCATION_TOTAL } from "../types";

const initialState = {
  allsearchedadverts: [],
  showingadverts: [],
  districtslist: [],
  advertlocationtotal: [],
  searchedadvertscount: 0,
  after: 0,
  more: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ADVERT_LOCATION_TOTAL:
      return {
        ...state,
        advertlocationtotal: action.advertlocationtotal,
        districtslist: action.districtslist,
      };
    case "START":
      return {
        ...state,
        allsearchedadverts: action.allsearchedadverts,
        showingadverts: action.showingadverts,
        searchedadvertscount: action.searchedadvertscount,
        after: action.after,
      };
    case "LOADED":
      return {
        ...state,
        showingadverts: action.showingadverts,
        more: action.more,
        after: action.after,
      };
    default:
      return { ...state };
  }
}
