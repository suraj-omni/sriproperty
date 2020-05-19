import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAdvertLocationTotal } from "../redux/actions/searchActions";

import Button from "react-bootstrap/Button";
import Select from "react-select";
import config from "../util/config";
import { getCitiesbasedonDistrict, convertArraytoKeyPair } from "../util/util";

export const SearchFilterBox = (props) => {
  const districtslist = config.districtsoptionslist;
  const categories = config.categoriesoptionslist;
  const [cities, setCities] = useState(null);
  const [selectedcity, setSelectedcity] = useState({ value: "", label: "All" });
  const [selectedcategory, setSelectedcategory] = useState(null);
  const [selecteddistrict, setSelecteddistrict] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(props.UI.loading);
    console.log("props.UI.loading");
  }, [props.UI.loading]);

  useEffect(() => {
    setSelecteddistrict(convertArraytoKeyPair([props.search.paramDistrict]));
    setCities(getCitiesbasedonDistrict(props.search.paramDistrict));
    console.log("props.search.paramDistrict");
  }, [props.search.paramDistrict]);

  useEffect(() => {
    setSelectedcategory(convertArraytoKeyPair(props.search.paramCategory));
    console.log("props.search.paramCategory");
  }, [props.search.paramCategory]);

  if (loading)
    return (
      <React.Fragment>
        <div className="mx-auto">
          {" "}
          <div className="mx-auto loader"></div>{" "}
          <div className="mx-auto loadder-text">Loading Data...</div>
        </div>
      </React.Fragment>
    );
  return (
    <React.Fragment>
      <div className="d-flex flex-row border mx-auto border-primary">
        <div className="p-2 flex-fill border border-primary">
          <Select
            id="districtdropdown"
            name="districtdropdown"
            options={districtslist}
            isSearchable="true"
            classNamePrefix="searchloc"
            className="dropdownwidthsearchbox_searchbox"
            value={selecteddistrict}
            onChange={(e) => {
              console.log(e);
              setSelecteddistrict({
                value: e.value,
                label: e.value,
              });
              setSelectedcity({
                value: "All",
                label: "All",
              });
              setCities(getCitiesbasedonDistrict(e.value));
            }}
          />
        </div>
        <div className="p-2 border border-primary">
          {" "}
          <Select
            name="citiesdropdown"
            options={cities}
            isSearchable="true"
            classNamePrefix="searchloc"
            className="dropdownwidthsearchbox_searchbox"
            value={selectedcity}
            onChange={(e) => {
              setSelectedcity({
                value: e.value,
                label: e.value,
              });
            }}
          />
        </div>
        <div className="p-2 border border-primary">
          {" "}
          <Select
            name="locationdropdown"
            options={categories}
            isSearchable="true"
            classNamePrefix="searchloc"
            className="dropdownwidthsearchbox_searchbox"
            value={selectedcategory}
            onChange={(e) => {
              setSelectedcategory({
                value: e.value,
                label: e.value,
              });
            }}
          />
        </div>
        <div className="p-2 border border-primary">
          <Button variant="primary" type="button" size="sm">
            Search Properties
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

SearchFilterBox.propTypes = {
  getAdvertLocationTotal: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  search: state.search,
});

const mapActionsToProps = {
  getAdvertLocationTotal,
};

export default connect(mapStateToProps, mapActionsToProps)(SearchFilterBox);
