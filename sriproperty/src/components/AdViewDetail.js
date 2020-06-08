import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faPhoneSquareAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { currencyFormat, altPhoneNumber, getimageUrllist } from "../util/util";
import Button from "react-bootstrap/Button";
import Link from "react-router-dom/Link";
import ImageSlider from "./ImageSlider";
import moment from "moment/moment";
import Loader from "./Loader";

export const AdViewDetail = (props) => {
  const [advert, setAdvert] = useState({});
  const [loading, setLoading] = useState(props.UI.loading);
  const [showphone, setShowphone] = useState(false);

  useEffect(() => {
    setAdvert(props.advert);
    console.log("props.advert", advert);
  }, [props.advert]);

  useEffect(() => {
    setLoading(props.UI.loading);
  }, [props.UI.loading]);

  const defpadding = "p-2";
  if (advert === {}) return null;
  const {
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
    modifiedAt,
  } = props.advert;
  const images = getimageUrllist(props.advert);
  const negotiable = rentalopricenegotiable ? "Negotiable" : "";
  const type = adverttype === "sell" ? "Sale" : "Rent";
  const price = currencyFormat(rentaloprice);

  //Checking based on category
  const isLand = category === "Land" ? true : false;
  const isHouse = category === "House" ? true : false;
  const isApartment = category === "Apartment" ? true : false;
  const isHolidayShortRental =
    category === "Holiday and Short Rental" ? true : false;
  const isRoomorAnnexe = category === "Room or Annex" ? true : false;
  const isCommercialProperty =
    category === "Commercial Property" ? true : false;
  const adverttypealt = adverttype === "sell" ? "Sale" : "Rent";
  const lastmodifiedAt = moment(modifiedAt);
  var curtime = moment(new Date());

  return (
    <React.Fragment>
      {!loading && advert && (
        <React.Fragment>
          <Container className="">
            {/*  <Row className={`${defpadding} `}>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                Library
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row> */}
            <Row className={`${defpadding} text-center`}>
              <Col>
                <Link className="adview-back" onClick={props.handleBack}>
                  Go back
                </Link>
              </Col>
            </Row>
            <Row className={`${defpadding} `}>
              <Container className="text-center ad-view-main-container ">
                <Row
                  id="titlerow"
                  className={`p-2 d-flex flex-row ad-view-main-titlerow `}
                >
                  <Col className="h4 ">{}</Col>
                </Row>
                {/* section 2 */}
                <Row className="d-flex flex-column ad-view-main-section2 py-2 ">
                  {/* location */}
                  <Row className={`${defpadding}`}>
                    <Col className="ad-view-loc-font">
                      <FontAwesomeIcon
                        className="ad-view-icon"
                        icon={faMapMarkerAlt}
                        size="1.5x"
                      />{" "}
                      {`  ${district}, ${city}`}
                    </Col>
                  </Row>
                  {address !== "" && (
                    <React.Fragment>
                      <Row className={`${defpadding} mx-auto `}>
                        <Col className="ad-view-main-type-font">{`${address}`}</Col>
                      </Row>
                    </React.Fragment>
                  )}

                  {/* end of location */}
                  <Row className={`${defpadding} mx-auto`}>
                    <Col>
                      <div className="m-auto ad-view-main-price-font">
                        {" "}
                        {`Rs.${price} / ${rentalopriceunit}`}
                        <span className="ad-view-main-price_nego-font">{`${negotiable}`}</span>
                      </div>
                    </Col>
                  </Row>
                </Row>
                {/* section 2 */}
                {/* images */}
                <Row className="ad-view-main-imagesection p-2 ">
                  <Col className="text-left">{`${category} For ${adverttypealt} by ${name}`}</Col>
                  <Col className="text-right">{`${lastmodifiedAt.from(
                    curtime
                  )}`}</Col>
                </Row>
                <Row className="ad-view-main-imagesection pb-3 bottom-border ">
                  <Col className="">
                    {image1Url !== "" && <ImageSlider images={images} />}
                  </Col>
                </Row>

                {/* images */}

                {/* baths and beds */}

                {isHouse && (
                  <React.Fragment>
                    <Row
                      className={`px-2 pt-2  pb-md-2 pb-xs-0 ad-view-elementdetails`}
                    >
                      <Col md={3} xs={6} className="text-right">
                        Bed Rooms :
                      </Col>
                      <Col md={2} xs={6} className="text-left pr-0">
                        {beds}
                      </Col>

                      <Col md={3} xs={6} className="text-right">
                        Bath Rooms :{" "}
                      </Col>
                      <Col md={3} xs={6} className="text-left pr-0">
                        {baths}
                      </Col>
                    </Row>
                    <Row
                      className={`px-2 pb-2 pt-xs-0 pt-md-2 bottom-border ad-view-elementdetails`}
                    >
                      <Col md={3} xs={6} className="text-right">
                        Floor Area :
                      </Col>
                      <Col
                        md={2}
                        xs={6}
                        className="text-left pr-0"
                      >{`${size} sq.ft`}</Col>
                      <Col md={3} xs={6} className="text-right">
                        Area of Land :
                      </Col>
                      <Col
                        md={3}
                        xs={6}
                        className="text-left pr-0"
                      >{`${landsize} ${landsizeunit}`}</Col>
                    </Row>
                  </React.Fragment>
                )}

                {isLand && (
                  <React.Fragment>
                    <Row className={`px-2 pt-2  pb-2 ad-view-elementdetails`}>
                      <Col md={3} xs={6} className="text-right">
                        Area of Land :
                      </Col>
                      <Col
                        md={2}
                        xs={6}
                        className="text-left pr-0"
                      >{`${landsize} ${landsizeunit}`}</Col>
                      <Col md={3} xs={6} className="text-right">
                        Type of Land :
                      </Col>
                      <Col
                        md={3}
                        xs={6}
                        className="text-left pr-0"
                      >{`${landtypes.slice(0, -1)}`}</Col>
                    </Row>
                  </React.Fragment>
                )}

                {isApartment && (
                  <React.Fragment>
                    <Row className={`px-2 pt-2  pb-2 ad-view-elementdetails`}>
                      <Col lg={3} md={4} xs={7} className="text-right">
                        Bed Rooms :
                      </Col>
                      <Col lg={1} md={2} xs={5} className="text-left pr-0">
                        {beds}
                      </Col>
                      <Col lg={2} md={4} xs={7} className="text-right">
                        Bath Rooms :
                      </Col>
                      <Col lg={1} md={2} xs={5} className="text-left pr-0">
                        {baths}
                      </Col>
                      <Col lg={3} md={7} xs={7} className="text-right">
                        Floor Area (sq.ft) :
                      </Col>
                      <Col
                        lg={2}
                        md={5}
                        xs={5}
                        className="text-left pr-0"
                      >{`${size}`}</Col>
                    </Row>
                  </React.Fragment>
                )}

                {isRoomorAnnexe && (
                  <React.Fragment>
                    <Row className={`px-2 pt-2  pb-2 ad-view-elementdetails`}>
                      <Col md={3} xs={6} className="text-right">
                        Bed Rooms :
                      </Col>
                      <Col md={1} xs={6} className="text-left pr-0">
                        {beds}
                      </Col>
                      <Col md={3} xs={6} className="text-right">
                        Bath Rooms :{" "}
                      </Col>
                      <Col md={1} xs={6} className="text-left pr-0">
                        {baths}
                      </Col>
                      <Col md={2} xs={6} className="text-right">
                        Property Type :
                      </Col>
                      <Col
                        md={2}
                        xs={6}
                        className="text-left pr-0"
                      >{`${propertytype}`}</Col>
                    </Row>
                  </React.Fragment>
                )}

                {isHolidayShortRental && (
                  <React.Fragment>
                    <Row className={`px-2 pt-2  pb-2 ad-view-elementdetails`}>
                      <Col lg={2} md={4} xs={6} className="text-right">
                        Bed Rooms :
                      </Col>
                      <Col lg={1} md={2} xs={6} className="text-left pr-0">
                        {beds}
                      </Col>
                      <Col lg={2} md={4} xs={6} className="text-right">
                        Bath Rooms :
                      </Col>
                      <Col lg={1} md={2} xs={6} className="text-left pr-0">
                        {baths}
                      </Col>
                      <Col lg={3} md={6} xs={6} className="text-right">
                        Property Type :
                      </Col>
                      <Col
                        lg={3}
                        md={6}
                        xs={6}
                        className="text-left pr-0"
                      >{`${propertytype}`}</Col>
                    </Row>
                  </React.Fragment>
                )}
                {/* end of baths and beds */}

                {/* floor size */}
                {isCommercialProperty && (
                  <React.Fragment>
                    <Row className={`px-2 pt-2  pb-2 ad-view-elementdetails`}>
                      <Col md={3} xs={6} className="text-right">
                        Floor Area :
                      </Col>
                      <Col
                        md={2}
                        xs={6}
                        className="text-left pr-0"
                      >{`${size} sq.ft`}</Col>
                      <Col md={4} xs={6} className="text-right">
                        Property Type :
                      </Col>
                      <Col
                        md={3}
                        xs={6}
                        className="text-left pr-0"
                      >{`${propertytype}`}</Col>
                    </Row>
                  </React.Fragment>
                )}
                {/* end of floor size */}

                <Row
                  className={`${defpadding} d-flex flex-row section-bg bottom-border `}
                >
                  {/* <Row className={`${defpadding} mx-auto`}> */}
                  <Col xs={12} className={`${defpadding} mx-auto`}>
                    <h6>Property Description</h6>
                  </Col>
                  {/* </Row>
              <Row
                className={`${defpadding} mx-auto text-center ad-view-desc-font `}
              > */}
                  <Col
                    xs={12}
                    className={`${defpadding} mx-auto text-center ad-view-desc-font `}
                  >
                    <p>{description}</p>
                  </Col>
                  {/* </Row> */}
                </Row>
                <Row className={`${defpadding} `}>
                  <Col>
                    <h6>Advertiser Contact Information</h6>
                  </Col>
                </Row>
                <Row className={`${defpadding} bottom-border `}>
                  <Col>
                    <div id="contactcard" className="card">
                      <div className="row no-gutters">
                        <div className="col-md-5 p-1 my-auto">
                          <img
                            src={userImageUrl}
                            className="card-img ad-view-advertiser-image"
                            alt={name}
                          />
                        </div>
                        <div className="col-md-7">
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
                            <p className="card-text my-auto">
                              <div>
                                <span className="mx-1">
                                  <FontAwesomeIcon
                                    style={{ color: "#588b8b" }}
                                    icon={faPhoneSquareAlt}
                                    size="1.5x"
                                  />
                                </span>
                                {showphone && (
                                  <React.Fragment>
                                    <span>Phone Number :- {phonenumber1}</span>
                                  </React.Fragment>
                                )}
                                {!showphone && (
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
                              {!showphone && (
                                <React.Fragment>
                                  <div className="my-2">
                                    <Button
                                      id="viewadshow"
                                      variant="warning"
                                      size="sm"
                                      disabled={showphone}
                                      onClick={setShowphone(true)}
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
                <Row className={`${defpadding} section-bg `}>
                  <Col>
                    <h6>Important Notice !!!</h6>
                    <p className="ad-view-notice-font">
                      This ad has been posted by <strong>{name} </strong>on
                      sriproperty.lk. sriproperty.lk do not take any
                      responsibility for the accuracy of the information posted
                      by the advertiser. sriproperty.lk is only providing the
                      service of list the advert by the advertiser. You will
                      need to contact the advertiser directly via email or
                      phone. You will need to take necessary precautions when
                      dealing in monetary matters and sign or share any
                      documents.
                    </p>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Container>
        </React.Fragment>
      )}
      {loading && <Loader displaytext="Loading Ad ..."></Loader>}
    </React.Fragment>
  );
};

AdViewDetail.propTypes = {
  UI: PropTypes.object.isRequired,
  advert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  advert: state.ad.advert,
});

export default connect(mapStateToProps)(AdViewDetail);
