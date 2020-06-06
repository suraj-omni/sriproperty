import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SearchResultDisplayBox from "./SearchResultDisplayBox";
import Loader from "./Loader";

export const FeaturedAdverts = (props) => {
  const [featuredadverts, setFeaturedAdverts] = useState([]);
  const { loadingfeatured } = props.UI;

  useEffect(() => {
    setFeaturedAdverts(props.search.featuredadverts);
    console.log("props.search.featuredadverts", props.search.featuredadverts);
  }, [props.search.featuredadverts]);

  let advertcards = (
    <Row className="mx-auto my-2">
      <Col>No Featured Properties.</Col>
    </Row>
  );

  if (featuredadverts && featuredadverts.length > 0) {
    advertcards = featuredadverts.map((advert) => (
      <Col xs={12} md={6} lg={4} className="my-2">
        <SearchResultDisplayBox advert={advert}></SearchResultDisplayBox>
      </Col>
    ));
  }

  return (
    <React.Fragment>
      {!loadingfeatured && advertcards && (
        <div className="row">{advertcards}</div>
      )}
      {loadingfeatured && (
        <Loader displaytext="Loading Featured Properties ..."></Loader>
      )}
    </React.Fragment>
  );
};

FeaturedAdverts.propTypes = {
  UI: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  search: state.search,
});

export default connect(mapStateToProps)(FeaturedAdverts);
