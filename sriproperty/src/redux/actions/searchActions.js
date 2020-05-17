import {
  LOAD_ADVERT_LOCATION_TOTAL,
  LOADING_UI,
  FINISHED_LOADING_UI,
} from "../types";
import axios from "axios";

//Get Advert Location Total
export const getAdvertLocationTotal = () => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get("/advertlocationtotal")
    .then((res) => {
      let locationtotals = [...res.data];

      let districtslist = [];
      locationtotals.map((d) => {
        console.log(d.district);
        districtslist.push({ value: d.district, label: d.district });
      });

      dispatch({
        type: LOAD_ADVERT_LOCATION_TOTAL,
        advertlocationtotal: locationtotals,
        districtslist: districtslist,
      });
      dispatch({ type: FINISHED_LOADING_UI });
      console.log("location totals:-", locationtotals);
      return locationtotals;
    })
    .catch((err) => {
      console.log("getAdvertLocationTotal", err);
      return null;
    });
};

export const searchAdverts = (searchParams, pagesize) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/searchadverts", searchParams)
    .then((res) => {
      let allsearchedadverts = [...res.data];
      let advertscount =
        allsearchedadverts && allsearchedadverts.length
          ? allsearchedadverts.length
          : 0;
      let showingadverts = allsearchedadverts.slice(0, pagesize);
      dispatch({
        type: "START",
        allsearchedadverts: allsearchedadverts,
        showingadverts: showingadverts,
        searchedadvertscount: advertscount,
        after: pagesize,
      });
      //console.log("getAdminSearchAdverts", adverts);
      dispatch({ type: FINISHED_LOADING_UI });
      console.log("search adverts count:-", advertscount);
      return showingadverts;
    })
    .catch((err) => {
      console.log("search adverts count", err);
      return err;
      /* dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      }); */
    });
};

export const loadNextSearchAdverts = (
  after,
  pagesize,
  allsearchedadverts,
  searchedadvertscount
) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log("after :", after);

  let _after = after + pagesize;
  let allposts = allsearchedadverts;
  let posts = allposts.slice(0, _after);
  let postcount = posts && posts.length ? posts.length : 0;

  let more = true;
  if (_after > searchedadvertscount) {
    more = false;
  }

  dispatch({
    type: "LOADED",
    showingadverts: posts,
    after: _after,
    more: more,
  });
  console.log("posts ", posts);
  dispatch({ type: FINISHED_LOADING_UI });
  console.log("getAllPosts count :-", postcount);
  return posts;
};
