import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { InitiateAd, setAdvert } from "../redux/actions/adActions";

class AddAdvertSelectAdType extends Component {
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
    if (advert) {
      this.cleanAdvertObj(advert);
    }

    //console.log("component Did mount category:", JSON.stringify(advert));
  };

  cleanAdvertObj = (advert) => {
    for (let [key, value] of Object.entries(advert)) {
      delete advert[`${key}`];
    }
    this.props.setAdvert(advert);
  };

  handleRentClick = (event) => {
    event.preventDefault();
    this.setState({ errors: {} });

    const advert = { adverttype: "rent" };

    this.setState({ advert });

    this.props.InitiateAd(advert, this.props.history);
  };

  handleSellClick = (event) => {
    event.preventDefault();
    this.setState({ errors: {} });

    const advert = { adverttype: "sell" };

    this.setState({ advert });

    this.props.InitiateAd(advert, this.props.history);
  };

  render() {
    return (
      <React.Fragment>
        <Container className="adcontainer-background adtype-wrapper my-3 generic-border">
          <Table className="">
            <Row className="">
              <Col className={`${this.state.colpadding} h4 text-center`}>
                Welcome Sri Property! Let's post an ad.
              </Col>
            </Row>
            <Row className="">
              <Col className={`${this.state.colpadding} h5 text-center`}>
                Choose any option below
              </Col>
            </Row>
            <Row>
              <Col md={6} xs={12}>
                <Table className="mx-auto m-2 picktable">
                  <Row>
                    <Col
                      className={`${this.state.colpadding} text-md-right text-xs-center`}
                    >
                      <Image
                        className="select_cat_imagesize"
                        src="../../img/houseforsale.png"
                        rounded
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      className={`${this.state.colpadding} text-md-right text-xs-center`}
                    >
                      <Button onClick={this.handleSellClick}>
                        I want to Sell
                      </Button>
                    </Col>
                  </Row>
                </Table>
              </Col>
              <Col md={6} xs={12}>
                <Table className="mx-auto m-2 picktable">
                  <Row>
                    <Col
                      className={`${this.state.colpadding} text-md-left text-xs-center`}
                    >
                      <Image
                        className="select_cat_imagesize"
                        src="../../img/forrent.png"
                        rounded
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      className={`${this.state.colpadding} text-md-left text-xs-center`}
                    >
                      <Button onClick={this.handleRentClick}>
                        I want to Rent
                      </Button>
                    </Col>
                  </Row>
                </Table>
              </Col>
            </Row>
            <Row className="mx-auto p-2s">
              <Col>
                <Table>
                  <Row>
                    <Col className={`${this.state.colpadding} text-center h3`}>
                      Guidelines on Posting an Ad
                    </Col>
                  </Row>
                  <Row>
                    <Col className={`text-center h5 text-info`}>
                      You need to follow the instructions below
                    </Col>
                  </Row>
                  <Row>
                    <Col className={`${this.state.colpadding}`}>
                      <div className="mx-auto">
                        <ul id="ulguidelines" className="list-styled text-info">
                          <li>
                            Please make sure you post in the correct category.
                          </li>
                          <li>
                            We do not allow posting same ad. There should be a 7
                            days gap inbetween posting same ad.
                          </li>
                          <li>We do not allow pictures with watermarks.</li>
                          <li>
                            You cannot post ads with multiple properties in one
                            ad.
                          </li>
                          <li>
                            We don't allow you to put your email or phone
                            numbers in the title or description.
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col></Col>
                  </Row>
                </Table>
              </Col>
            </Row>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

AddAdvertSelectAdType.propTypes = {
  InitiateAd: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  setAdvert: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  ad: PropTypes.object.isRequired,
  advert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI,
  ad: state.ad,
});

const mapActionsToProps = {
  InitiateAd,
  setAdvert,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddAdvertSelectAdType);
