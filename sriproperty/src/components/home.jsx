import React, { Component } from "react";
import SliderSearchBox from "./slidersearchbox";
import HomeSlider from "./slider";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ClearAllSearch } from "../redux/actions/searchActions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selecteddistrict: null,
      selectedcategory: null,
    };
  }

  componentWillMount = () => {
    this.props.ClearAllSearch();
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
        <div></div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  ClearAllSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapActionsToProps = {
  ClearAllSearch,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
