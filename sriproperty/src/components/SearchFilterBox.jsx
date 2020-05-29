import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchAdverts } from "../redux/actions/searchActions";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import config from "../util/config";
import { getCitiesbasedonDistrict, convertArraytoKeyPair } from "../util/util";

export const SearchFilterBox = (props) => {
  const districtslist = config.districtsoptionslist;
  const _ = require("lodash");
  const categories = config.categoriesoptionslist;

  const sortByOptions = config.search_SortyByOptions;
  const adType = config.search_adType;

  const [cities, setCities] = useState(null);

  const [selectedcity, setSelectedcity] = useState({
    value: "All",
    label: "All Cities",
  });

  const [selectedcategory, setSelectedcategory] = useState({
    value: "All",
    label: "All Categories",
  });

  const [selectedadType, setSelectedadType] = useState({
    value: "All",
    label: "All Ad Types",
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
    <Row xs={12} className="filterbox-toprow mx-auto  pb-3">
      <Col lg={2} md={12} className="">
        <div className="d-flex flex-column ">
          <div className="p-1">District</div>
          <div className="p-1">
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
                setCities([
                  ...emptycities,
                  ...getCitiesbasedonDistrict(e.value),
                ]);

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
          </div>
        </div>
      </Col>
      <Col lg={2} md={12} className=" ">
        <div className="d-flex flex-column ">
          <div className="p-1">City</div>
          <div className="p-1">
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
          </div>
        </div>
      </Col>
      <Col lg={2} md={12} className="">
        <div className="d-flex flex-column ">
          <div className="p-1">Category</div>
          <div className="p-1">
            <Select
              name="category"
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
          </div>
        </div>
      </Col>
      <Col lg={2} md={12} className="">
        <div className="d-flex flex-column">
          <div className="p-1">Ad Type</div>
          <div className="p-1">
            <Select
              name="adType"
              options={adType}
              isSearchable="true"
              classNamePrefix="searchloc"
              className="dropdownwidthsearchbox_searchbox"
              value={selectedadType}
              onChange={(e) => {
                setSelectedadType({
                  value: e.value,
                  label: e.label,
                });
              }}
            />
          </div>
        </div>
      </Col>
      <Col lg={4} md={12} className="mt-lg-4  text-xs-center p-2 text-lg-left">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            props.handleSearch(
              selecteddistrict.value,
              selectedcity.value,
              selectedcategory.value,
              selectedSortByOption.value,
              selectedadType.value
            );
          }}
        >
          Search Properties
        </Button>
      </Col>
    </Row>
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
