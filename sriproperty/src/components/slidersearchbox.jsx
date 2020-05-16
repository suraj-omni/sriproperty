import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAdvertLocationTotal } from "../redux/actions/searchActions";

const config = require("../util/config");

class SliderSearchBox extends Component {
  state = {
    selecteddistrict: null,
    selectedcategory: null,
    labelclass: "serachlabels",
  };

  componentDidMount = () => {
    this.props.getAdvertLocationTotal();
  };

  handleDistrictChange = (selecteddistrict) => {
    this.setState({ selecteddistrict });
  };

  handleCategoryChange = (selectedcategory) => {
    this.setState({ selectedcategory });
  };

  handleSearch = () => {};

  render() {
    const districtslist = this.props.search.districtslist;
    const categories = config.categoriesoptionslist;
    return (
      <React.Fragment>
        <Form id="searchform" className="">
          <Form.Row className="text-center">
            <Form.Group as={Col} sm="12" controlId="formGridEmail">
              <Form.Label className={this.state.labelclass}>
                District
              </Form.Label>
            </Form.Group>
            <Form.Group as={Col} sm="12" controlId="formGridEmail">
              <div>
                <Select
                  name="locationdropdown"
                  options={districtslist}
                  isSearchable="true"
                  classNamePrefix="searchloc"
                  className="dropdownwidthsearchbox"
                  value={this.state.selecteddistrict}
                  onChange={this.handleDistrictChange}
                />
              </div>
            </Form.Group>

            <Form.Group as={Col} sm="12" controlId="formGridPassword">
              <Form.Label className={this.state.labelclass}>
                Category
              </Form.Label>
              <div>
                <Select
                  name="locationdropdown"
                  options={categories}
                  isSearchable="true"
                  classNamePrefix="searchloc"
                  className="dropdownwidthsearchbox"
                  value={this.state.selectedcategory}
                  onChange={this.handleCategoryChange}
                />
              </div>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm="12" controlId="formGridPassword">
              <Button variant="primary" onClick={this.handleSearch}>
                Search Property
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </React.Fragment>
    );
  }
}

SliderSearchBox.propTypes = {
  getAdvertLocationTotal: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  search: state.search,
});

const mapActionsToProps = {
  getAdvertLocationTotal,
};

export default connect(mapStateToProps, mapActionsToProps)(SliderSearchBox);
