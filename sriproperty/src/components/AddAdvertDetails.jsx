import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addAdvert,
  IsvalidAdvert,
  validateAdvertProperty,
  clearErrosPageLoad,
  setAdvert,
} from "../redux/actions/adActions";
import AdvertDetailsMaster from "./AdvertDetailsMaster";

class AddAdvertDetails extends AdvertDetailsMaster {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.initpage().then(async () => {
      await this.initializePage();
    });
  }

  initpage = async () => {
    if (this.props.ad.advert.adverttype) {
      const advert = { ...this.props.ad.advert };

      /* console.log(
        "initpage getting from ad.advert.advert type",
        JSON.stringify(advert)
      ); */
      await this.props.setAdvert(advert);
    } else {
      const advert = JSON.parse(localStorage.advert);
      console.log(
        "initpage getting from local storage",
        JSON.stringify(advert)
      );
      // await this.props.setAdvert(advert);
    }
  };

  initializePage = async () => {
    let pricelabel = "Price";
    const advert = { ...this.props.advert };
    //console.log("initializePage start advert", JSON.stringify(advert));

    const { category, adverttype } = advert;

    if (adverttype === "sell") {
      if (category !== "Land") {
        pricelabel = "Total price";
      }
    } else if (adverttype === "rent") {
      if (category === "Land") {
        pricelabel = "Rent / year";
      } else if (category === "Holiday and Short Rental") {
        pricelabel = "Rent / night";
      } else {
        pricelabel = "Rent / month";
      }
    }

    if (!(category === "Land" && adverttype === "sell")) {
      advert["rentalopriceunit"] = pricelabel;
      this.props.setAdvert(advert);
    }

    //await this.props.setAdvert(advert);
    await this.setState({ advert, pricelabel });
    this.selectedlandTypeCheckBoxes = new Set();
    this.selectednegotiablecheckbox = new Set();
    await this.props.clearErrosPageLoad();

    /* console.log(
      "advert details master  componentDidMount",
      JSON.stringify(advert) 
    );*/
  };

  render() {
    const { loading } = this.props;
    if (loading)
      return (
        <React.Fragment>
          <div className="mx-auto">
            {" "}
            <div className="mx-auto loader"></div>{" "}
            <div className="mx-auto loadder-text">Loading Data...</div>
          </div>
        </React.Fragment>
      );

    return (
      <React.Fragment>
        <Container className="adcontainer-background adtype-wrapper  my-3 generic-border">
          <Table>
            {this.headerRowComponent()}
            <Row>
              <Col className={`text-center`}>
                {this.progressIndicatorComponent()}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form onSubmit={this.handleFormSubmit}>
                  <Table>
                    <Row>
                      {/* district and city */}
                      {this.render_District_Edit_Component()}
                      {this.render_Cities_Edit_Component()}
                    </Row>
                    {/* land types */}
                    {this.renderLandTypesComponent()}

                    {/* baths, beds, property type & size  */}
                    {this.renderBaths_Beds_Size_PropertyType_Component()}

                    {/* land size & land unit */}
                    {this.renderLandSize_Unit_Component()}
                    {/* address , title &  description */}
                    {this.render_Desc_Title_Address_Component()}
                    {/* price  */}
                    {this.render_Price_Component()}
                    {/* contact details */}
                    {this.render_ContactDetails_Component()}

                    {/* alert component */}
                    {this.render_Alert_Component()}

                    {/* save button */}
                    {this.render_Save_Component()}
                  </Table>
                  {this.render_Popup_Modal()}
                </Form>
              </Col>
            </Row>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

//export default AddAdvertDetails;

AddAdvertDetails.propTypes = {
  addAdvert: PropTypes.func.isRequired,
  setAdvert: PropTypes.func.isRequired,
  validateAdvertProperty: PropTypes.func.isRequired,
  IsvalidAdvert: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  ad: PropTypes.object.isRequired,
  advert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI,
  ad: state.ad,
  advert: state.ad.advert,
});

const mapActionsToProps = {
  addAdvert,
  setAdvert,
  validateAdvertProperty,
  IsvalidAdvert,
  clearErrosPageLoad,
};

export default connect(mapStateToProps, mapActionsToProps)(AddAdvertDetails);
