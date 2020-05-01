import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faPhoneSquareAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { currencyFormat, altPhoneNumber, getimageUrllist } from "../util/util";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import ImageSlider from "./ImageSlider";

class AdViewMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defpadding: "p-2",
      errors: {},
      showphone: false,
    };
  }

  showPhoneNumber = () => {
    this.setState({ showphone: true });
  };

  currencyFormat = (num) => {
    return currencyFormat(num);
  };

  render() {
    const { loading } = this.props;
    const defpadding = this.state.defpadding;
    const {
      title,
      adverttype,
      name,
      district,
      city,
      image1Url,
      rentaloprice,
      rentalopricenegotiable,
      rentalopriceunit,
      category,
      baths,
      beds,
      address,
      description,
      landsize,
      landsizeunit,
      propertytype,
      size,
      landtypes,
      userImageUrl,
      email,
      phonenumber1,
    } = this.props.advert;
    const images = getimageUrllist(this.props.advert);
    const negotiable = rentalopricenegotiable ? "Negotiable" : "";
    const type = adverttype === "sell" ? "Sale" : "Rent";
    const price = this.currencyFormat(rentaloprice);

    //Checking based on category
    const isLand = category === "Land" ? true : false;
    const isHouse = category === "House" ? true : false;
    const isApartment = category === "Apartment" ? true : false;
    const isHolidayShortRental =
      category === "Holiday and Short Rental" ? true : false;
    const isRoomorAnnexe = category === "Room or Annex" ? true : false;
    const isCommercialProperty =
      category === "Commercial Property" ? true : false;

    //end of checkings based on category

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
        <Container>
          <Row className={`${defpadding}`}>
            <Col>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                  Library
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row className={`${defpadding}`}>
            <Col>Row for Back</Col>
          </Row>
          <Row className={`${defpadding}`}>
            <Container className="px-2 pt-3 text-center ad-view-main-container">
              <Row id="titlerow" className={`${defpadding} border-bottom`}>
                <Col className="h4">{title}</Col>
              </Row>
              {/* location */}
              <Row className={`${defpadding}`}>
                <Col className="ad-view-loc-font">
                  <FontAwesomeIcon
                    style={{ color: "#588b8b" }}
                    icon={faMapMarkerAlt}
                    size="1.5x"
                  />{" "}
                  {`  ${district}, ${city}`}
                </Col>
              </Row>
              <Row className={`${defpadding}`}>
                <Col className="ad-view-main-type-font">{`${address}`}</Col>
              </Row>
              {/* end of location */}
              <Row className={`${defpadding}`}>
                <Col>
                  <div className="m-auto ad-view-main-price-font">
                    {" "}
                    {`Rs.${price} / ${rentalopriceunit}`}{" "}
                    <span className="ad-view-main-price_nego-font">{`${negotiable}`}</span>
                  </div>
                </Col>
              </Row>
              <Row className={`${defpadding} border-bottom`}>
                <Col className="ad-view-main-type-font">{`For ${type} by ${name}`}</Col>
              </Row>

              <Row className={`${defpadding}`}>
                <Col>{image1Url !== "" && <ImageSlider images={images} />}</Col>
              </Row>
              <Row className={`${defpadding}`}>
                <Col>Ad Category :- </Col>
                <Col>{`${category}`}</Col>
              </Row>

              {/* property type */}
              {(isRoomorAnnexe ||
                isCommercialProperty ||
                isHolidayShortRental) && (
                <React.Fragment>
                  <Row className={`${defpadding}`}>
                    <Col>Property Type :- </Col>
                    <Col>{`${propertytype}`}</Col>
                  </Row>
                </React.Fragment>
              )}
              {/* end of property type */}

              {/* baths and beds */}
              {(isHouse ||
                isApartment ||
                isHolidayShortRental ||
                isRoomorAnnexe) && (
                <React.Fragment>
                  <Row className={`${defpadding}`}>
                    <Col>Bed Rooms :- </Col>
                    <Col>{beds}</Col>
                  </Row>
                  <Row className={`${defpadding}`}>
                    <Col>Bath Rooms :- </Col>
                    <Col>{baths}</Col>
                  </Row>
                </React.Fragment>
              )}
              {/* end of baths and beds */}

              {/* floor size */}
              {(isHouse || isApartment || isCommercialProperty) && (
                <React.Fragment>
                  <Row className={`${defpadding}`}>
                    <Col>Floor Area :- </Col>
                    <Col>{size}</Col>
                  </Row>
                </React.Fragment>
              )}
              {/* end of floor size */}

              {/* area of land */}
              {(isHouse || isLand) && (
                <React.Fragment>
                  <Row className={`${defpadding}`}>
                    <Col>Area of Land</Col>
                    <Col>{`${landsize} ${landsizeunit}`}</Col>
                  </Row>
                </React.Fragment>
              )}
              {/* end of area of land */}
              {/* type of land */}
              {isLand && (
                <React.Fragment>
                  <Row className={`${defpadding}`}>
                    <Col>Type of Land</Col>
                    <Col>{`${landtypes}`}</Col>
                  </Row>
                </React.Fragment>
              )}
              {/* end of type of land */}

              <Row className={`${defpadding} border-bottom`}></Row>
              <Row className={`${defpadding}`}>
                <Col>
                  <h6>Property Description</h6>
                </Col>
              </Row>
              <Row
                className={`${defpadding} text-left ad-view-desc-font border-bottom`}
              >
                <Col>{description}</Col>
              </Row>
              <Row className={`${defpadding}`}>
                <Col>
                  <h6>Advertiser Contact Information</h6>
                </Col>
              </Row>
              <Row className={`${defpadding} border-bottom`}>
                <Col>
                  <div id="contactcard" className="card">
                    <div className="row no-gutters">
                      <div className="col-md-4 p-1 my-auto">
                        <img
                          src={userImageUrl}
                          className="card-img ad-view-advertiser-image"
                          alt={name}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title"></h5>
                          <p className="card-text">Name :- {name}</p>
                          <p className="card-text">
                            <span className="mx-1">
                              <FontAwesomeIcon
                                style={{ color: "#588b8b" }}
                                icon={faEnvelope}
                                size="1.5x"
                              />
                            </span>
                            <span>E-mail :- {email}</span>
                          </p>
                          <p className="card-text my-auto my-2">
                            <div>
                              <span className="mx-1">
                                <FontAwesomeIcon
                                  style={{ color: "#588b8b" }}
                                  icon={faPhoneSquareAlt}
                                  size="1.5x"
                                />
                              </span>
                              {this.state.showphone && (
                                <React.Fragment>
                                  <span>Phone Number :- {phonenumber1}</span>
                                </React.Fragment>
                              )}
                              {!this.state.showphone && (
                                <React.Fragment>
                                  <span>
                                    Phone Number :-{" "}
                                    {altPhoneNumber(phonenumber1)}{" "}
                                  </span>
                                </React.Fragment>
                              )}
                            </div>
                          </p>
                          <p className="card-text my-auto">
                            {!this.state.showphone && (
                              <React.Fragment>
                                <div className="my-2">
                                  <Button
                                    variant="warning"
                                    size="sm"
                                    disabled={this.state.showphone}
                                    onClick={this.showPhoneNumber}
                                  >
                                    Click here to Show Phone Number
                                  </Button>
                                </div>
                              </React.Fragment>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className={`${defpadding}`}>
                <Col>
                  <h6>Important Notice !!!</h6>
                  <p className="ad-view-notice-font">
                    This ad has been posted by <strong>{name} </strong>on
                    sriproperty.lk. sriproperty.lk do not take any
                    responsibility for the accuracy of the information posted by
                    the advertiser. sriproperty.lk is only providing the service
                    of list the advert by the advertiser. You will need to
                    contact the advertiser directly via email or phone. You will
                    need to take necessary precautions when dealing in monetary
                    matters and sign or share any documents.
                  </p>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default AdViewMain;
