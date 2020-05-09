import React, { Suspense, lazy } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAdvertbyId,
  validateAdvertProperty,
  IsvalidAdvert,
  clearErrosPageLoad,
  setAdvert,
  editAdvert,
} from "../redux/actions/adActions";

import AdvertDetailsMaster from "./AdvertDetailsMaster";

class EditAdvertDetails extends AdvertDetailsMaster {
  constructor(props) {
    super(props);
  }

  initpage = () => {
    if (!(this.props.advert && this.props.advert.advertid)) {
      if (this.props.match.params.id) {
        const advert = { advertid: this.props.match.params.id };
        this.props.getAdvertbyId(advert);
      } else {
        alert("Error Occured!!!");
      }
    }
  };

  componentWillMount() {
    this.initpage();
  }

  componentDidMount() {
    // console.log("componentDidMount");
    this.initializePage();
  }

  initializePage = () => {
    this.selectedlandTypeCheckBoxes = new Set();
    this.selectednegotiablecheckbox = new Set();
    this.props.clearErrosPageLoad();
  };

  render() {
    const { adminComments } = this.props.advert;
    if (this.props.UI.loading) {
      return (
        <React.Fragment>
          <div className="mx-auto">
            {" "}
            <div className="mx-auto loader"></div>{" "}
            <div className="mx-auto loadder-text">Loading Data...</div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <Suspense
        fallback={
          <React.Fragment>
            <div className="mx-auto">
              {" "}
              <div className="mx-auto loader"></div>{" "}
              <div className="mx-auto loadder-text">Loading Data...</div>
            </div>
          </React.Fragment>
        }
      >
        <React.Fragment>
          <Container>
            <Table>
              {this.headerRowComponent()}
              <Row>
                <Col className={`text-center`}>
                  {this.progressIndicator_Edit_Component()}
                </Col>
              </Row>
              {this.render_AdminComments_Component()}
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
                      {this.render_Edit_Save_Component()}
                    </Table>
                    {this.render_Popup_EditFinish_Modal()}
                    {this.render_Popup_Edit_Modal()}
                  </Form>
                </Col>
              </Row>
            </Table>
          </Container>
        </React.Fragment>
      </Suspense>
    );
  }
}

EditAdvertDetails.propTypes = {
  getAdvertbyId: PropTypes.func.isRequired,
  IsvalidAdvert: PropTypes.func.isRequired,
  editAdvert: PropTypes.func.isRequired,
  setAdvert: PropTypes.func.isRequired,
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
  getAdvertbyId,
  validateAdvertProperty,
  IsvalidAdvert,
  clearErrosPageLoad,
  setAdvert,
  editAdvert,
};

export default connect(mapStateToProps, mapActionsToProps)(EditAdvertDetails);
