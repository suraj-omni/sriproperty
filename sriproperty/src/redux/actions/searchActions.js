import {
  LOAD_ADVERT_LOCATION_TOTAL,
  LOADING_UI,
  FINISHED_LOADING_UI,
  SEARCH_START,
  SEARCH_LOADED,
  SET_SEARCH_PARAMS,
  SET_SEARCH_NORECORDS,
  CLEAR_SEARCH_PARAMS,
  GET_LATEST_ADVERTS,
  GET_FEATURED_ADVERTS,
  LOADING_LATEST_ADVERTS,
  FINISED_LOADING_LATEST_ADVERTS,
  LOADING_FEATURED_ADVERTS,
  FINISED_LOADING_FEATURED_ADVERTS,
} from "../types";

import moment from "moment/moment";

import axios from "axios";

import { categories } from "../../util/config";

const _ = require("lodash");

export const ClearAllSearch = (history, district, category) => (dispatch) => {
  dispatch({ type: CLEAR_SEARCH_PARAMS });
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

export const filterbyCity = (searchParams, allsearchedadverts, pagesize) => (
  dispatch
) => {
  dispatch({ type: LOADING_UI });

  const {
    city,
    district,
    sortBy,
    sortOrder,
    catrgoryarray,
    adType,
  } = searchParams;

  let arr = [];
  let showingadvers = [];
  let more = true;
  new Promise((resolve, reject) => {
    /*     dispatch({
      type: "SORT_SEARCHED_DATA",
      allshowingadverts: [],
      showingadverts: [],
    }); */
    resolve(true);
  })
    .then(() => {
      new Promise((resolve) => {
        _.each(
          (allsearchedadverts = allsearchedadverts),
          (item) => (item.rentaloprice = parseInt(item.rentaloprice, 10))
        );

        _.each(
          (allsearchedadverts = allsearchedadverts),
          (item) =>
            (item.modifiedAt = new moment(item.modifiedAt).format("YYYYMMDD"))
        );

        //Filter by City
        arr = _.filter(allsearchedadverts, {
          city: `${city}`,
        });

        //Filter by Ad Type
        console.log("searchParams.adType", adType);
        if (adType !== "All") {
          arr = _.filter(arr, {
            adverttype: `${adType}`,
          });
        }

        arr = _.orderBy(arr, [`${sortBy}`], [`${sortOrder}`]);

        showingadvers = arr.slice(0, pagesize);

        if (arr.length < pagesize) {
          more = false;
        }

        resolve(true);
      })
        .then(() => {
          dispatch({
            type: "FILTER_BY_CITY",
            allshowingadverts: arr,
            showingadverts: showingadvers,
            searchedadvertscount: arr.length,
            after: pagesize,
            more: more,
            paramDistrict: district,
            paramCategory: catrgoryarray,
          });
          dispatch({ type: FINISHED_LOADING_UI });
        })
        .catch((err) => {
          console.log("error occured", err);
        });
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export const sortSearchedItems = (
  sortOrder,
  sortBy,
  allshowingadverts,
  pagesize
) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  let arr = [];
  let showingadvers = [];
  new Promise((resolve, reject) => {
    /*     dispatch({
      type: "SORT_SEARCHED_DATA",
      allshowingadverts: [],
      showingadverts: [],
    }); */
    resolve(true);
  }).then(() => {
    new Promise((resolve, reject) => {
      //console.log("sortBy", sortBy, "sortOrder", sortOrder);

      let temparr = _.slice(
        allshowingadverts,
        [0],
        [allshowingadverts.length]
      ).reverse();

      _.each(
        (allshowingadverts = allshowingadverts),
        (item) => (item.rentaloprice = parseInt(item.rentaloprice, 10))
      );

      _.each(
        (allshowingadverts = allshowingadverts),
        (item) =>
          (item.modifiedAt = new moment(item.modifiedAt).format("YYYYMMDD"))
      );

      arr = _.orderBy(temparr, [`${sortBy}`], [`${sortOrder}`]);

      resolve(arr);
    }).then(() => {
      new Promise((resolve) => {
        //console.log("sortedadverts", arr);
        showingadvers = arr.slice(0, pagesize);
        resolve(showingadvers);
      })
        .then((showingadvers) => {
          // console.log("arr", arr, showingadvers);
          dispatch({
            type: "SORT_SEARCHED_DATA",
            allshowingadverts: arr,
            showingadverts: showingadvers,
            after: pagesize,
          });
          dispatch({ type: FINISHED_LOADING_UI });
        })
        .catch((err) => {
          console.error("error", err);
        });
    });
  });
};

export const searchAdverts = (searchParams, pagesize = 6) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  // we need to keep "All if selected all. hence when we query we need to send the array"
  // but for reference we will keep value "All"
  console.log("before searchParams", searchParams);
  let catrgoryarray = [];
  let allsearchedadverts = [];
  let tmp_category = searchParams.catrgoryarray;

  if (searchParams.catrgoryarray === "All") {
    searchParams.catrgoryarray = categories;
  } else {
    searchParams.catrgoryarray = [searchParams.catrgoryarray];
  }

  axios
    .post("/searchadverts", searchParams)
    .then((res) => {
      let allsearchedadverts = [...res.data];

      if (allsearchedadverts && allsearchedadverts.length > 0) {
        //There is data
        //How many records are there
        let advertscount = allsearchedadverts.length;
        console.log("advertscount", advertscount);
        let promise3 = new Promise((resolve) => {
          _.each(
            (allsearchedadverts = allsearchedadverts),
            (item) => (item.rentaloprice = parseInt(item.rentaloprice, 10))
          );

          _.each(
            (allsearchedadverts = allsearchedadverts),
            (item) =>
              (item.modifiedAt = new moment(item.modifiedAt).format("YYYYMMDD"))
          );

          let arr = _.orderBy(
            allsearchedadverts,
            [`${searchParams.sortBy}`],
            [`${searchParams.sortOrder}`]
          );

          allsearchedadverts = _.slice(arr, [0], [arr.length]);

          //Filter Cities
          console.log("searchParams.city", searchParams.city);
          if (searchParams.city !== "All") {
            arr = _.filter(arr, {
              city: `${searchParams.city}`,
            });
          }

          //Filter Ad Type
          console.log("searchParams.adType", searchParams.adType);
          if (searchParams.adType !== "All") {
            arr = _.filter(arr, {
              adverttype: `${searchParams.adType}`,
            });
          }

          if (arr & (arr.length === 0)) {
            dispatch({
              type: SET_SEARCH_NORECORDS,
              paramCategory: tmp_category,
              paramDistrict: searchParams.district,
              allsearchedadverts: [],
              showingadverts: [],
              more: false,
            });
          }
          resolve(arr);
        });

        promise3.then((sortedadverts) => {
          console.log("b", new Date().getMilliseconds());
          //Get only first few as set by page size to display initially.
          let showingadverts = sortedadverts.slice(0, pagesize);

          //dispatch reducet method
          dispatch({
            type: SEARCH_START,
            allsearchedadverts: allsearchedadverts,
            allshowingadverts: sortedadverts,
            showingadverts: showingadverts,
            searchedadvertscount: advertscount,
            after: pagesize,
            paramCategory: tmp_category,
            paramDistrict: searchParams.district,
          });
          console.log("d", new Date().getMilliseconds());
        });
      } else {
        // no records

        dispatch({
          type: SET_SEARCH_NORECORDS,
          paramCategory: tmp_category,
          paramDistrict: searchParams.district,
          allsearchedadverts: [],
          showingadverts: [],
          more: false,
        });
      }
      dispatch({ type: FINISHED_LOADING_UI });
      return true;
    })
    .catch((err) => {
      console.log("search adverts count", err);
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
  allshowingadverts,
  searchedadvertscount
) => (dispatch) => {
  console.log(
    "after,  pagesize,  allshowingadverts,  searchedadvertscount",
    after,
    pagesize,
    allshowingadverts,
    searchedadvertscount
  );
  dispatch({ type: LOADING_UI });

  let _after = after + pagesize;
  let allposts = allshowingadverts;
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

export const getFeaturedProperties = () => (dispatch) => {
  dispatch({ type: LOADING_FEATURED_ADVERTS });
  axios
    .get("/getFeaturedAdverts")
    .then((res) => {
      let adverts = [...res.data];
      console.log("getFeaturedProperties", adverts);
      dispatch({
        type: GET_FEATURED_ADVERTS,
        featuredadverts: adverts,
      });
      dispatch({ type: FINISED_LOADING_FEATURED_ADVERTS });
      return adverts;
    })
    .catch((err) => {
      console.log("getFeaturedProperties", err);
      return null;
    });
};

//Get Latest Adverts

export const getLatestProperties = () => (dispatch) => {
  dispatch({ type: LOADING_FEATURED_ADVERTS });
  axios
    .get("/getLatestAdverts")
    .then((res) => {
      let adverts = [...res.data];
      dispatch({
        type: GET_LATEST_ADVERTS,
        latestadverts: adverts,
      });
      dispatch({ type: FINISED_LOADING_LATEST_ADVERTS });
      return adverts;
    })
    .catch((err) => {
      console.log("getLatestProperties", err);
      return null;
    });
};
