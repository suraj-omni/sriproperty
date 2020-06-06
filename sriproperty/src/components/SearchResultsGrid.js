import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import config from "../util/config";
import Select from "react-select";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "./Loader";

import SearchResultDisplayBox from "./SearchResultDisplayBox";

export const SearchResultsGrid = (props) => {
  const { more } = props.search;
  const [adverts, setAdverts] = useState([]);

  const { loading } = props.UI;
  const { loadMore } = props;

  const loader = React.useRef(loadMore);
  const observer = React.useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "150px" }
    )
  );
  const [element, setElement] = React.useState(null);

  const sortByOptions = config.search_SortyByOptions;
  const [selectedSortByOption, setSelectedSortByOption] = useState(
    config.search_SortyByOptions[0]
  );

  React.useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  useEffect(() => {
    setAdverts(props.search.showingadverts);
    //console.log("props.search.showingadverts", props.search.showingadverts);
  }, [props.search.showingadverts]);

  let advertcards = (
    <div className="d-flex flex-row mx-auto my-2">
      Sorry! there is nothing to show.
    </div>
  );

  if (adverts && adverts.length > 0) {
    advertcards = adverts.map((advert) => (
      <Col xs={12} md={6} lg={4} className="my-2">
        <SearchResultDisplayBox advert={advert}></SearchResultDisplayBox>
      </Col>
    ));
  }

  return (
    <React.Fragment>
      {!loading && advertcards && (
        <React.Fragment>
          <Row className="mx-auto p-2 d-flex flex-row justify-content-end">
            <Col className="my-auto  text-right p-1" xs={4}>
              Sort results by :
            </Col>
            <Col className="p-1 align-middle" xs={8} md={5} lg={3}>
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
          </Row>
          <Row className="mx-auto py-2">{advertcards}</Row>
        </React.Fragment>
      )}
      {loading && <Loader displaytext="Loading Ad's ..."></Loader>}

      {!loading && more && <div ref={setElement}></div>}
    </React.Fragment>
  );
};

SearchResultsGrid.propTypes = {
  UI: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  search: state.search,
});

export default connect(mapStateToProps)(SearchResultsGrid);
