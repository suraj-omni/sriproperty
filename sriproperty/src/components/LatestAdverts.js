import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SearchResultDisplayBox from "./SearchResultDisplayBox";
import Loader from "./Loader";

export const LatestAdverts = (props) => {
  const [latestadverts, setLatestAdverts] = useState([]);
  const { loadinglatest } = props.UI;

  useEffect(() => {
    setLatestAdverts(props.search.latestadverts);
    console.log("props.search.featuredadverts", props.search.latestadverts);
  }, [props.search.latestadverts]);

  let advertcards = (
    <Row className="mx-auto my-2">
      <Col>Sorry! there is nothing to show.</Col>
    </Row>
  );

  if (latestadverts && latestadverts.length > 0) {
    advertcards = latestadverts.map((advert) => (
      <Col xs={12} md={6} lg={4} className="my-2">
        <SearchResultDisplayBox advert={advert}></SearchResultDisplayBox>
      </Col>
    ));
  }

  return (
    <React.Fragment>
      {!loadinglatest && advertcards && (
        <Row className="mx-auto">{advertcards}</Row>
      )}

      {loadinglatest && (
        <Loader displaytext="Loading Latest Properties ..."></Loader>
      )}
    </React.Fragment>
  );
};

LatestAdverts.propTypes = {
  UI: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  search: state.search,
});

export default connect(mapStateToProps)(LatestAdverts);
