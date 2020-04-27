import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Select from "react-select";

class SliderSearchBox extends Component {
  state = {
    options: [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ],
    selectedOption: null,
    labelclass: "serachlabels",
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    //console.log(`Option selected:`, selectedOption);
  };

  render() {
    return (
      <React.Fragment>
        <Form id="searchform" className="">
          <Form.Row className="text-center">
            <Form.Group as={Col} sm="12" controlId="formGridEmail">
              <Form.Label className={this.state.labelclass}>
                Category
              </Form.Label>
            </Form.Group>
            <Form.Group as={Col} sm="12" controlId="formGridEmail">
              <div>
                <Select
                  name="locationdropdown"
                  options={this.state.options}
                  isMulti="true"
                  isSearchable="true"
                  classNamePrefix="searchloc"
                  className="dropdownwidthsearchbox"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group as={Col} sm="12" controlId="formGridPassword">
              <Form.Label className={this.state.labelclass}>
                Location
              </Form.Label>
              <div>
                <Select
                  name="locationdropdown"
                  options={this.state.options}
                  isMulti="true"
                  isSearchable="true"
                  classNamePrefix="searchloc"
                  className="dropdownwidthsearchbox"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                />
              </div>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm="12" controlId="formGridPassword">
              <Button variant="primary" type="submit">
                Search Property
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </React.Fragment>
    );
  }
}

export default SliderSearchBox;
