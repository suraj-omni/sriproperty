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
