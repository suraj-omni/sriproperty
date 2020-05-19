import {
  LOAD_ADVERT_LOCATION_TOTAL,
  LOADING_UI,
  FINISHED_LOADING_UI,
  SEARCH_START,
  SEARCH_LOADED,
  SET_SEARCH_PARAMS,
  SET_SEARCH_NORECORDS,
  CLEAR_SEARCH_PARAMS,
} from "../types";

import axios from "axios";

import { categories } from "../../util/config";

import { convertArraytoKeyPair } from "../../util/util";

export const ClearAllSearch = (history, district, category) => (dispatch) => {
  console.log("ClearAllSearch");

  dispatch({ type: CLEAR_SEARCH_PARAMS });
  //history.push(`/search/${district}/${category}`);
};

//Get Advert Location Total
export const getAdvertLocationTotal = () => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get("/advertlocationtotal")
    .then((res) => {
      let locationtotals = [...res.data];

      let districtslist = [];
      locationtotals.map((d) => {
        districtslist.push({ value: d.district, label: d.district });
      });

      dispatch({
        type: LOAD_ADVERT_LOCATION_TOTAL,
        advertlocationtotal: locationtotals,
        districtslist: districtslist,
      });
      dispatch({ type: FINISHED_LOADING_UI });
      return locationtotals;
    })
    .catch((err) => {
      console.log("getAdvertLocationTotal", err);
      return null;
    });
};

export const searchAdverts = (searchParams, pagesize) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  // we need to keep "All if selected all. hence when we query we need to send the array"
  // but for reference we will keep value "All"
  //console.log("before searchParams", searchParams);
  let catrgoryarray = [];
  let tmp_category = [searchParams.catrgoryarray];

  if (searchParams.catrgoryarray === "All") {
    searchParams.catrgoryarray = categories;
  } else {
    searchParams.catrgoryarray = [searchParams.catrgoryarray];
  }

  //console.log(searchParams.district);
  //console.log(tmp_category);

  //console.log("searchParams", searchParams);
  //console.log("tmp_category", tmp_category);

  axios
    .post("/searchadverts", searchParams)
    .then((res) => {
      let allsearchedadverts = [...res.data];
      if (allsearchedadverts && allsearchedadverts.length > 0) {
        //There is data
        //How many records are there
        let advertscount = allsearchedadverts.length;

        //Get only first few as set by page size to display initially.
        let showingadverts = allsearchedadverts.slice(0, pagesize);

        //dispatch reducet method
        dispatch({
          type: SEARCH_START,
          allsearchedadverts: allsearchedadverts,
          showingadverts: showingadverts,
          searchedadvertscount: advertscount,
          after: pagesize,
          paramCategory: tmp_category,
          paramDistrict: searchParams.district,
        });
      } else {
        // no records

        dispatch({
          type: SET_SEARCH_NORECORDS,
          paramCategory: tmp_category,
          paramDistrict: searchParams.district,
        });
      }
      dispatch({ type: FINISHED_LOADING_UI });
      return true;
    })
    .catch((err) => {
      //console.log("search adverts count", err);
      dispatch({
        type: SET_SEARCH_PARAMS,
        paramCategory: tmp_category,
        paramDistrict: searchParams.district,
      });
      return false;
    });
};

export const loadNextSearchAdverts = (
  after,
  pagesize,
  allsearchedadverts,
  searchedadvertscount
) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  let _after = after + pagesize;
  let allposts = allsearchedadverts;
  let posts = allposts.slice(0, _after);
  let postcount = posts && posts.length ? posts.length : 0;

  let more = true;
  if (_after > searchedadvertscount) {
    more = false;
  }

  dispatch({
    type: SEARCH_LOADED,
    showingadverts: posts,
    after: _after,
    more: more,
  });
  console.log("posts ", posts);
  dispatch({ type: FINISHED_LOADING_UI });
  console.log("getAllPosts count :-", postcount);
  return posts;
};
