import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import SearchResultDisplayBox from "./SearchResultDisplayBox";

export const SearchResultsGrid = (props) => {
  const { showingadverts: adverts, more } = props.search;
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
      { rootMargin: "200px" }
    )
  );
  const [element, setElement] = React.useState(null);

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

  let advertcards = adverts.map((advert) => (
    <Col xs={12} md={6} lg={4} className="my-2">
      <SearchResultDisplayBox advert={advert}></SearchResultDisplayBox>
    </Col>
  ));

  return (
    <React.Fragment>
      <Row className="mx-auto">{advertcards}</Row>

      {loading && <li>Loading...</li>}

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
