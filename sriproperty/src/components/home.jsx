import React, { Component } from "react";
import SliderSearchBox from "./slidersearchbox";
import HomeSlider from "./slider";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  ClearAllSearch,
  getFeaturedProperties,
  getLatestProperties,
} from "../redux/actions/searchActions";

import FeaturedAdverts from "./FeaturedAdverts";
import LatestAdverts from "./LatestAdverts";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selecteddistrict: null,
      selectedcategory: null,
      featuredadverts: [],
    };
  }

  componentWillMount = () => {
    this.props.ClearAllSearch();
    this.props.getFeaturedProperties();
    this.props.getLatestProperties();
  };

  handleSearch = async () => {
    if (!this.state.selectedcategory || !this.state.selecteddistrict) {
      alert("Please select a Location and a Category!!!");
      return null;
    } else {
      this.props.ClearAllSearch();
      this.props.history.push(
        `/search/${this.state.selecteddistrict.value}/${this.state.selectedcategory.value}/All`
      );
    }
  };

  handleDistrictChange = (selecteddistrict) => {
    this.setState({ selecteddistrict });
  };

  handleCategoryChange = (selectedcategory) => {
    this.setState({ selectedcategory });
  };

  render() {
    return (
      <React.Fragment>
        <HomeSlider></HomeSlider>
        <div id="slidersearchdiv" className="slidersearchdivlocation">
          <SliderSearchBox
            handleSearch={this.handleSearch}
            handleDistrictChange={this.handleDistrictChange}
            handleCategoryChange={this.handleCategoryChange}
            selecteddistrict={this.state.selecteddistrict}
            selectedcategory={this.state.selectedcategory}
          ></SliderSearchBox>
        </div>
        <Container className="mb-4">
          <Row className="mx-auto homepagecontainerwrapper border rounded mt-4 py-3">
            <Row className="mx-auto">
              <Col>
                <h3>Featured Properties</h3>
              </Col>
            </Row>

            <Row className="mx-auto">
              <Col>
                <FeaturedAdverts props={this.props}></FeaturedAdverts>
              </Col>
            </Row>
          </Row>
          <Row className="mx-auto homepagecontainerwrapper border rounded mt-4 py-3">
            <Row className="mx-auto">
              <Col>
                <h3>Latest Properties</h3>
              </Col>
            </Row>
            <Row className="mx-auto">
              <Col>
                <LatestAdverts props={this.props}></LatestAdverts>
              </Col>
            </Row>
          </Row>
          <Row className="mx-auto homepagecontainerwrapper border rounded my-4 py-3">
            <Row className="ml-2 text-left">
              <Col>
                <h4>About sriproperty.lk</h4>
              </Col>
            </Row>
            <Row className="mx-2 about-sriproperty-font">
              <Col>
                <p>
                  sriproperty.lk is a property and apartment listing website /
                  real estate website. We have set our objective to become the
                  most popular place for Sri Lankans to buy, rent and sell their
                  properties. The site features an of properties spanning across
                  houses, apartments, annexes, and lands for both rent and sale
                  in all across the island. The sriproperty.lk website is open
                  to anyone to submit their property for sale, property for
                  rent, land sales or any similar service ads in Sri Lanka.
                </p>
              </Col>
            </Row>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  ClearAllSearch: PropTypes.func.isRequired,
  getFeaturedProperties: PropTypes.func.isRequired,
  getLatestProperties: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapActionsToProps = {
  ClearAllSearch,
  getFeaturedProperties,
  getLatestProperties,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
