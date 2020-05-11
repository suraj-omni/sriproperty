import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export const SearchResultsGrid = (props) => {
  const { adverts: posts, more } = props.ad;
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
      { rootMargin: "100px" }
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

  return (
    <React.Fragment>
      <Container className="mx-auto">
        {posts.map((post) => (
          <Card style={{ width: "50%" }} className="m-3">
            <Card.Img
              variant="top"
              src={
                post.image1Url != ""
                  ? post.image1Url
                  : "https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/no-image-icon.png?alt=media"
              }
              style={{ width: "90%", heights: "90%" }}
              className="mx-auto my-2"
            />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text className="text-center ad-view-desc-font">
                {`${post.description.substring(0, 150)} (more...) `}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <div className="m-auto ad-view-main-price-font">
                  {" "}
                  {`Rs.${post.rentaloprice} / ${post.rentalopriceunit}`}{" "}
                  <span className="ad-view-main-price_nego-font">{`${post.rentalopricenegotiable}`}</span>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <FontAwesomeIcon
                  style={{ color: "#588b8b" }}
                  icon={faMapMarkerAlt}
                  size="1.5x"
                />{" "}
                {`  ${post.district}, ${post.city}`}
              </ListGroupItem>
              <ListGroupItem className="ad-view-main-type-font">{`For ${post.adverttype} by ${post.name}`}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        ))}

        {loading && <li>Loading...</li>}

        {!loading && more && <div ref={setElement}></div>}
      </Container>
    </React.Fragment>
  );
};

SearchResultsGrid.propTypes = {
  UI: PropTypes.object.isRequired,
  ad: PropTypes.object.isRequired,
  adverts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  ad: state.ad,
  adverts: state.ad.advert,
});

export default connect(mapStateToProps)(SearchResultsGrid);
