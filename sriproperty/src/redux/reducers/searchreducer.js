import { LOAD_ADVERT_LOCATION_TOTAL } from "../types";

const initialState = {
  alladverts: [],
  districtslist: [],
  advertlocationtotal: [],
  advertscount: 0,
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
    default:
      return { ...state };
  }
}
