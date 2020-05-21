import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchFilterBox from "./SearchFilterBox";

import {
  searchAdverts,
  loadNextSearchAdverts,
  sortSearchedItems,
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

    const searchParams = {
      district: district,
      catrgoryarray: category,
      sortBy: "modifiedAt",
      sortOrder: "desc",
    };
    console.log("searchParams before func call", searchParams);
    this.props.searchAdverts(searchParams, this.state.pagesize);
  };

  handleSearch = (district, city, catrgoryarray, sortByval) => {
    console.log("handleSearch sortByval", sortByval);
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
      sortBy: sortBy,
      sortOrder: sortOrder,
    };
    console.log("handleSearch", searchParams);
    this.props.searchAdverts(searchParams);
  };

  handleSort = (sortByval) => {
    console.log("handleSort sortByval", sortByval);

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
      this.props.search.showingadverts,
      this.props.search.allsearchedadverts
    );
  };

  loadMore = () => {
    this.props.loadNextSearchAdverts(
      this.props.search.after,
      this.state.pagesize,
      this.props.search.allsearchedadverts,
      this.props.search.searchedadvertscount
    );
  };

  render() {
    const { showingadverts: posts, more } = this.props.search;
    const { loading } = this.props.UI;
    return (
      <React.Fragment>
        <Row className="advertisingrow d-flex border border-primary text-center mx-auto px-4 my-2">
          <marquee>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/banner-aws-1024x350.png?alt=media&token=5e76cf7a-90c3-4a02-b224-2797fa5fc34c"
              thumbnail
              className="advertisingrow-img"
            />
          </marquee>
        </Row>
        <Row className="d-flex flex-md-row flex-column justify-content-center align-items-center border border-primary mx-auto">
          <SearchFilterBox
            props={this.props}
            handleSearch={this.handleSearch}
            handleSort={this.handleSort}
          ></SearchFilterBox>
        </Row>
        <Row className="border border-primary d-flex p-md-3 p-xs-0 mx-auto my-2">
          <Col xs={12} md={9} className="border border-primary">
            <SearchResultsGrid
              props={this.props}
              loadMore={this.loadMore}
            ></SearchResultsGrid>
          </Col>
          <Col xs={0} md={3} className="border border-primary p-2">
            <Card>
              <Card.Img
                variant="top"
                src="https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/advertise-wih-us.png?alt=media&token=f1d5083b-2df7-46f0-a190-48e708264bae"
              />
              <Card.Body>
                <Card.Title>Advertise with us</Card.Title>
                <Card.Text>
                  Contact us and get to know how to publish your advertisements
                  in this space.<p> marketing@sriproperty.lk</p>
                </Card.Text>
                <Button variant="info">Contact us</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

SearchAdvert.propTypes = {
  searchAdverts: PropTypes.func.isRequired,
  loadNextSearchAdverts: PropTypes.func.isRequired,
  sortSearchedItems: PropTypes.func.isRequired,
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
};

export default connect(mapStateToProps, mapActionsToProps)(SearchAdvert);
