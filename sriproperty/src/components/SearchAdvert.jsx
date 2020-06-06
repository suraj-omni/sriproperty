import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import SearchFilterBox from "./SearchFilterBox";

import {
  searchAdverts,
  loadNextSearchAdverts,
  sortSearchedItems,
  filterbyCity,
} from "../redux/actions/searchActions";

import SearchResultsGrid from "./SearchResultsGrid";

export class SearchAdvert extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    pagesize: 6,
  };

  componentDidMount = () => {
    const district = this.props.match.params.district;
    const category = this.props.match.params.category;
    const adtype = this.props.match.params.adtype;

    const searchParams = {
      district: district,
      city: "All",
      catrgoryarray: category,
      adType: adtype,
      sortBy: "modifiedAt",
      sortOrder: "desc",
    };
    // console.log("searchParams before func call", searchParams);
    this.props.searchAdverts(searchParams, this.state.pagesize);
  };

  handleSearch = (district, city, catrgoryarray, sortByval, adType) => {
    console.log(
      "district, city, catrgoryarray, sortByval, adType",
      district,
      city,
      catrgoryarray,
      sortByval,
      adType
    );

    let sortBy = "modifiedAt";
    let sortOrder = "desc";

    if (sortByval === "price_desc") {
      sortBy = "rentaloprice";
      sortOrder = "desc";
    } else if (sortByval === "price_asc") {
      sortBy = "rentaloprice";
      sortOrder = "asc";
    } else if (sortByval === "date_asc") {
      sortBy = "modifiedAt";
      sortOrder = "asc";
    } else {
      sortBy = "modifiedAt";
      sortOrder = "desc";
    }

    const searchParams = {
      district: district,
      city: city,
      catrgoryarray: catrgoryarray,
      adType: adType,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    const {
      paramCategory,
      paramDistrict,
      allsearchedadverts,
      allshowingadverts,
    } = this.props.search;

    //check if its only a city change and just filter results
    if (
      paramCategory === catrgoryarray &&
      paramDistrict === district &&
      city !== "All" &&
      allsearchedadverts.length > 0
    ) {
      this.props.filterbyCity(
        searchParams,
        allsearchedadverts,
        this.state.pagesize
      );
    } else {
      // call back db
      this.props.searchAdverts(searchParams);
    }
  };

  handleSort = (sortByval) => {
    //console.log("handleSort sortByval", sortByval);

    let sortBy = "";
    let sortOrder = "";

    if (sortByval === "price_desc") {
      sortBy = "rentaloprice";
      sortOrder = "desc";
    } else if (sortByval === "price_asc") {
      sortBy = "rentaloprice";
      sortOrder = "asc";
    } else if (sortByval === "date_asc") {
      sortBy = "modifiedAt";
      sortOrder = "asc";
    } else {
      sortBy = "modifiedAt";
      sortOrder = "desc";
    }

    this.props.sortSearchedItems(
      sortOrder,
      sortBy,
      this.props.search.allshowingadverts,
      this.state.pagesize
    );
  };

  loadMore = () => {
    this.props.loadNextSearchAdverts(
      this.props.search.after,
      this.state.pagesize,
      this.props.search.allshowingadverts,
      this.props.search.searchedadvertscount
    );
  };

  render() {
    const { showingadverts: posts, more } = this.props.search;
    const { loading } = this.props.UI;
    return (
      <React.Fragment>
        <Container id="homemastercontainer" className="p-2 mx-auto">
          <Row className="advertisingrow d-flex text-center my-2 mx-auto">
            <Card className="text-white">
              <a href="https://ebuy.lk/" target="_blank" rel="noopener">
                <Card.Img
                  className="advertheight image fluid"
                  src="https://firebasestorage.googleapis.com/v0/b/sriproperty-b397e.appspot.com/o/ads%2Febuylk.png?alt=media&token=5ba5ce96-91ab-4b5b-8a35-30391a288194"
                  alt="Card image"
                />
              </a>
              {/* <Card.ImgOverlay>
                <Card.Footer>
                  <div className="ml-auto mr-2">
                    <a
                      href="https://ebuy.lk/products/sony-wh-1000xm3-wireless-noise-cancelling-stereo-headset"
                      target="_blank"
                      rel="noopener"
                    >
                      <Button size="sm" variant="dark">
                        Shop Now
                      </Button>
                    </a>
                  </div>
                </Card.Footer>
              </Card.ImgOverlay> */}
            </Card>
          </Row>
          <Row className="d-flex my-2 mx-auto">
            <SearchFilterBox
              props={this.props}
              handleSearch={this.handleSearch}
              handleSort={this.handleSort}
            ></SearchFilterBox>
          </Row>
          <Row className="d-flex mx-auto my-2 searchresultswrapper">
            <Col xs={12} md={9} className="p-2">
              <SearchResultsGrid
                props={this.props}
                loadMore={this.loadMore}
                handleSort={this.handleSort}
              ></SearchResultsGrid>
            </Col>
            <Col xs={0} md={3} className="p-2 ">
              <Card>
                <Card.Img
                  variant="top"
                  src="https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/advertise-wih-us.png?alt=media&token=f1d5083b-2df7-46f0-a190-48e708264bae"
                />
                <Card.Body>
                  <Card.Title>Advertise with us</Card.Title>
                  <Card.Text>
                    Contact us and get to know how to publish your
                    advertisements in this space.
                    <p> marketing@sriproperty.lk</p>
                  </Card.Text>
                  <Button variant="info">Contact us</Button>
                </Card.Body>
              </Card>
              <p></p>
              <Card>
                <Card.Img
                  className="advert-logo ml-auto mr-2"
                  variant="top"
                  src="https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/ads%2Fg21%20-%20Copy.png?alt=media&token=894f17dc-dee3-47d0-bb3f-4e08e74d750d"
                />
                <Card.Img
                  className="advert-product mx-auto"
                  variant="top"
                  src="https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/ads%2Fsony-wh1000xm3-wireless-industry-leading-noise-canceling-over-ear-headphones.png?alt=media&token=388656c2-eaf9-4612-bbd4-40fd6aa0adb1"
                />
                <Card.Body>
                  <Card.Title>
                    <h6>
                      Sony WH-1000Xm3 Wireless Noise Cancelling Stereo Headset
                    </h6>
                  </Card.Title>
                  <Card.Text>
                    <p>
                      <a
                        href="https://ebuy.lk/products/sony-wh-1000xm3-wireless-noise-cancelling-stereo-headset"
                        target="_blank"
                        rel="noopener"
                      >
                        <Button size="sm" variant="dark">
                          Shop Now
                        </Button>
                      </a>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

SearchAdvert.propTypes = {
  searchAdverts: PropTypes.func.isRequired,
  loadNextSearchAdverts: PropTypes.func.isRequired,
  sortSearchedItems: PropTypes.func.isRequired,
  filterbyCity: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  search: state.search,
});

const mapActionsToProps = {
  searchAdverts,
  loadNextSearchAdverts,
  sortSearchedItems,
  filterbyCity,
};

export default connect(mapStateToProps, mapActionsToProps)(SearchAdvert);
