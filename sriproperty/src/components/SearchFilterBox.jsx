import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchAdverts } from "../redux/actions/searchActions";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import config from "../util/config";
import { getCitiesbasedonDistrict, convertArraytoKeyPair } from "../util/util";

export const SearchFilterBox = (props) => {
  const districtslist = config.districtsoptionslist;
  const _ = require("lodash");
  const categories = config.categoriesoptionslist;

  const sortByOptions = config.search_SortyByOptions;

  const [cities, setCities] = useState(null);

  const [selectedcity, setSelectedcity] = useState({
    value: "All",
    label: "All Cities",
  });

  const [selectedcategory, setSelectedcategory] = useState({
    value: "All",
    label: "All Categories",
  });

  const [selecteddistrict, setSelecteddistrict] = useState({
    value: "",
    label: "",
  });

  const [selectedSortByOption, setSelectedSortByOption] = useState(
    config.search_SortyByOptions[0]
  );

  const emptycities = [
    {
      value: "All",
      label: "All Cities",
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(props.UI.loading);
  }, [props.UI.loading]);

  useEffect(() => {
    setSelecteddistrict(convertArraytoKeyPair([props.search.paramDistrict])[0]);
    setCities([
      ...emptycities,
      ...getCitiesbasedonDistrict(props.search.paramDistrict),
    ]);
    console.log("props.search.paramDistrict", props.search.paramDistrict);
    console.log(
      "convertArraytoKeyPair([props.search.paramDistrict])",
      convertArraytoKeyPair([props.search.paramDistrict])
    );
  }, [props.search.paramDistrict]);

  useEffect(() => {
    let categoryarr = [];
    if (props.search.paramCategory !== undefined) {
      //console.log("props.search.paramCategory", props.search.paramCategory);
      if (props.search.paramCategory === "All") {
        categoryarr = categories;
      } else {
        categoryarr = convertArraytoKeyPair([props.search.paramCategory]);
      }
      //console.log("categoryarr", categoryarr);
      setSelectedcategory(categoryarr[0]);
    }
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
      <Col
        xs={12}
        md={6}
        lg={2}
        className="mx-md-auto p-2 border border-primary"
      >
        <Select
          id="districtdropdown"
          name="districtdropdown"
          options={districtslist}
          isSearchable="true"
          classNamePrefix="searchloc"
          className="dropdownwidthsearchbox_searchbox"
          value={selecteddistrict}
          onChange={(e) => {
            //Set cities and also add all cities select with empty cities.
            setCities([...emptycities, ...getCitiesbasedonDistrict(e.value)]);

            setSelecteddistrict({
              value: e.value,
              label: e.value,
            });

            setSelectedcity({
              value: "All",
              label: "All Cities",
            });
          }}
        />
      </Col>
      <Col
        xs={12}
        md={6}
        lg={2}
        className="mx-md-auto p-2 border border-primary"
      >
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
              label: e.label,
            });
          }}
        />
      </Col>
      <Col
        xs={12}
        md={6}
        lg={2}
        className="mx-md-auto p-2 border border-primary"
      >
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
              label: e.label,
            });
          }}
        />
      </Col>
      <Col
        xs={12}
        md={6}
        lg={2}
        className="mx-md-auto p-2 border border-primary"
      >
        <Select
          name="locationdropdown"
          options={sortByOptions}
          isSearchable="true"
          classNamePrefix="searchloc"
          className="dropdownwidthsearchbox_searchbox"
          value={selectedSortByOption}
          onChange={(e) => {
            setSelectedSortByOption({
              value: e.value,
              label: e.label,
            });
            props.handleSort(e.value);
          }}
        />
      </Col>
      <Col
        xs={12}
        lg={4}
        className="text-lg-left text-center border p-2 border-primary"
      >
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            console.log("ass", selectedSortByOption.value);
            props.handleSearch(
              selecteddistrict.value,
              selectedcity.value,
              selectedcategory.value,
              selectedSortByOption.value
            );
          }}
        >
          Search Properties
        </Button>
      </Col>
    </React.Fragment>
  );
};

SearchFilterBox.propTypes = {
  searchAdverts: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  search: state.search,
});

const mapActionsToProps = {
  searchAdverts,
};

export default connect(mapStateToProps, mapActionsToProps)(SearchFilterBox);
