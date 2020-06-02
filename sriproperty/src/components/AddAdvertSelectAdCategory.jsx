import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { setCategory, setAdvert } from "../redux/actions/adActions";
import { Link } from "react-router-dom";
class AddAdvertSelectAdCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textboxclass: "p-2",
      navlinkclass: "nav-link",
      colpadding: "p-2",
      advert: {},
    };
  }

  componentDidMount = () => {
    const advert = this.props.ad.advert;
    //console.log(JSON.stringify(advert));
    this.cleanAdvertObj(advert);

    //console.log("component Did mount category:", JSON.stringify(advert));
  };

  cleanAdvertObj = (advert) => {
    for (let [key, value] of Object.entries(advert)) {
      if (key !== "adverttype" && key != "category") {
        // console.log(`${key}: ${value}`);
        delete advert[`${key}`];
      }
    }
    this.props.setAdvert(advert);
  };

  handleLinkClick = (event) => {
    event.preventDefault();
    let advert = this.props.ad.advert;
    advert["category"] = event.target.value;
    console.log("cat page after update", JSON.stringify(advert));
    this.props.setCategory(advert, this.props.history);
  };

  render() {
    const { adverttype } = this.props.ad.advert;
    const isRent = adverttype === "rent" ? true : false;
    return (
      <React.Fragment>
        <Container className="adcontainer-background adtype-wrapper  generic-border">
          <Table>
            <Row>
              <Col className={`${this.state.colpadding} h5 text-center`}>
                {`Please select the Category of the property you want to ${adverttype}`}
              </Col>
            </Row>
            <Row>
              <Col className={`${this.state.colpadding} text-center`}>
                {/* arrow indicator */}
                <div className="d-flex bg-highlight">
                  <div className="px-2 flex-fill"></div>
                  <div className="px-2 flex-fill">
                    <FontAwesomeIcon
                      style={{ color: "#6DB65B" }}
                      icon={faCaretDown}
                      size="2x"
                      title="This is where you are in the ad post process."
                    />
                  </div>
                  <div className="px-2 flex-fill"></div>
                  <div className="px-2 flex-fill"></div>
                </div>
                {/* arrow indicator end */}
                <div id="progresscontainer" className="d-flex bg-highlight">
                  <div id="step1" className="progressinactive p-2 flex-fill">
                    <Link
                      to="/postad"
                      className={`progresslink ${this.state.navlinkclass}`}
                    >
                      Step 1:- Sell or Rent?
                    </Link>
                  </div>
                  <div id="step2" className="progressactive p-2 flex-fill">
                    Step 2:- Pick Category
                  </div>
                  <div id="step3" className="progressinactive p-2 flex-fill">
                    Step 3:- Fill Details
                  </div>
                  <div id="step3" className="progressinactive p-2 flex-fill">
                    Step 4:- Upload images
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className={`${this.state.colpadding} h5 text-center`}>
                <ListGroup>
                  <ListGroup.Item
                    action
                    onClick={this.handleLinkClick}
                    value="Land"
                  >
                    Land
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={this.handleLinkClick}
                    value="House"
                  >
                    House
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={this.handleLinkClick}
                    value="Apartment"
                  >
                    Apartment
                  </ListGroup.Item>
                  {isRent && (
                    <ListGroup.Item
                      action
                      onClick={this.handleLinkClick}
                      value="Room or Annex"
                    >
                      Room or Annex
                    </ListGroup.Item>
                  )}

                  {isRent && (
                    <ListGroup.Item
                      action
                      onClick={this.handleLinkClick}
                      value="Holiday and Short Rental"
                    >
                      Holiday and Short Rental
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item
                    action
                    onClick={this.handleLinkClick}
                    value="Commercial Property"
                  >
                    Commercial Property
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

AddAdvertSelectAdCategory.propTypes = {
  setCategory: PropTypes.func.isRequired,
  setAdvert: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  ad: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI,
  ad: state.ad,
});

const mapActionsToProps = {
  setCategory,
  setAdvert,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddAdvertSelectAdCategory);
