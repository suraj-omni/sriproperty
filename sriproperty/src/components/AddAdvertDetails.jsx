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
} from "../redux/actions/adActions";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import FormGroup from "react-bootstrap/FormGroup";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";

const config = require("../util/config");

class AddAdvertDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textboxclass: "p-2",
      navlinkclass: "nav-link",
      colpadding: "p-2",
      advert: {},
      cities: [],
      errors: {},
      rentalopriceunit: "",
      selecteddistrict: "",
      show: false,
      showAlert: false,
      pricelabel: "",
      gridforCategory: { "Commercial Property": 6 },
    };
  }

  componentDidMount = () => {
    const { advert } = JSON.parse(localStorage.advert);
    let pricelabel = "";
    const { category, adverttype } = advert;

    if (adverttype === "sell") {
      if (category !== "Land") {
        pricelabel = "Total price";
      }
    } else if (adverttype === "rent") {
      if (category === "Land") {
        pricelabel = "Rent (Rs) /year";
      } else if (category === "Holiday and Short Rental") {
        pricelabel = "Rent (Rs) /night";
      } else {
        pricelabel = "Rent (Rs) /month";
      }
    }

    if (!(category === "Land" && adverttype === "sell")) {
      advert["rentalopriceunit"] = pricelabel;
    }

    this.setState({ advert, pricelabel });

    this.selectedlandTypeCheckBoxes = new Set();
    this.selectednegotiablecheckbox = new Set();
    this.props.clearErrosPageLoad();
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleAlertClose = () => {
    this.setState({ showAlert: false });
  };

  handleAlertShow = () => {
    this.setState({ showAlert: true });
  };

  handleSave = () => {
    const submitbutton = document.getElementById("btnsubmit");
    console.log(submitbutton);
    submitbutton.click();
  };

  getCitiesbasedonDistrict = (selecteddistrict) => {
    switch (selecteddistrict) {
      case "Ampara":
        return config.amparaCities;
      case "Anuradhapura":
        return config.anuradhapuraCities;
      case "Badulla":
        return config.badullaCities;
      case "Batticaloa":
        return config.colomboCities;
      case "Colombo":
        return config.colomboCities;
      case "Galle":
        return config.galleCities;
      case "Gampaha":
        return config.gampahaCities;
      case "Hambantota":
        return config.hambantotaCities;
      case "Jaffna":
        return config.jaffnaCities;
      case "Kalutara":
        return config.kalutaraCities;
      case "Kandy":
        return config.kandyCities;
      case "Kegalle":
        return config.kegalleCities;
      case "Kilinochchi":
        return config.kilinochchiCities;
      case "Kurunegala":
        return config.kurunegalaCities;
      case "Mannar":
        return config.mannarCities;
      case "Matale":
        return config.mataleCities;
      case "Matara":
        return config.mataraCities;
      case "Monaragala":
        return config.monaragalaCities;
      case "Mullaitivu":
        return config.mullativuCities;
      case "Nuwara Eliya":
        return config.nuwaraeliyaCities;
      case "Polonnaruwa":
        return config.polonnaruwaCities;
      case "Puttalam":
        return config.puttalamCities;
      case "Ratnapura":
        return config.ratnapuraCities;
      case "Trincomalee":
        return config.trincomaleeCities;
      case "Vavuniya":
        return config.vavuniyaCities;
      default:
        return config.vavuniyaCities;
    }
  };

  handleDistrictChange = (event) => {
    const selecteddistrict = event.target.value;
    const cities = this.getCitiesbasedonDistrict(selecteddistrict);
    this.setState({ selecteddistrict, cities });

    const { name, value } = event.target;
    const { category } = this.state.advert;
    const errors = { ...this.props.UI.errors };
    this.props.validateAdvertProperty(name, value, errors);

    this.setPropertiestoAdvert(event.target.name, event.target.value);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const { category } = this.state.advert;
    const errors = { ...this.props.UI.errors };
    this.props.validateAdvertProperty(name, value, errors);
    this.setPropertiestoAdvert(name, value);
  };

  toggleCheckbox = (event) => {
    if (this.selectedlandTypeCheckBoxes.has(event.target.value)) {
      this.selectedlandTypeCheckBoxes.delete(event.target.value);
    } else {
      this.selectedlandTypeCheckBoxes.add(event.target.value);
    }

    let landtypes = "";
    let advert = this.state.advert;

    for (const landtype of this.selectedlandTypeCheckBoxes) {
      landtypes = landtypes.concat(landtype).concat(",");
    }
    advert["landtypes"] = `${landtypes}`;
    this.setState({ advert });
  };

  toggleNegotiableCheckBox = (event) => {
    let advert = this.state.advert;

    if (this.selectednegotiablecheckbox.has(event.target.value)) {
      this.selectednegotiablecheckbox.delete(event.target.value);
      advert["rentalopricenegotiable"] = false;
    } else {
      this.selectednegotiablecheckbox.add(event.target.value);
      advert["rentalopricenegotiable"] = true;
    }

    this.setState({ advert });
  };

  setPropertiestoAdvert = (name, value) => {
    let advert = this.state.advert;
    advert[`${name}`] = `${value}`;
    this.setState({ advert });
  };

  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();
    let advert = this.state.advert;
    advert["advertStatus"] = "new";

    if (this.state.advert)
      if (this.props.IsvalidAdvert(advert)) {
        this.props.addAdvert(advert, this.props.history);
      } else {
        this.state.show = false;
        this.state.showAlert = true;
      }

    console.log(this.props.UI.errors);
  };

  render() {
    const { errors, loading } = this.props.UI;

    const { adverttype, category } = this.state.advert;

    const isLand = category === "Land" ? true : false;
    const isHouse = category === "House" ? true : false;
    const isApartment = category === "Apartment" ? true : false;
    const isHolidayShortRental =
      category === "Holiday and Short Rental" ? true : false;
    const isRoomorAnnexe = category === "Room or Annex" ? true : false;
    const isCommercialProperty =
      category === "Commercial Property" ? true : false;
    const pricelabel = this.state.pricelabel;
    const districts = config.districts;
    const landTypes = config.landTypes;
    const cities = this.state.cities;
    const landSizes = config.landSizes;
    const priceUnits = config.priceUnits;
    const bathsbeds = config.bathsbeds;
    const propertytype_commercialproperty =
      config.propertytype_commercialproperty;
    const propertytype_holidayshortrental =
      config.propertytype_holidayshortrental;
    const propertytype_roomannex = config.propertytype_roomannex;
    const { phonenumber, email, name } = this.props.credentials;
    const gridsize = category === "Commercial Property" ? 6 : 4;
    const { phonenumberconfirmed } = this.props.credentials;
    const phonenumberconfirmedstr = phonenumberconfirmed
      ? "Confirmed"
      : "Not confirmed";
    return (
      <React.Fragment>
        <Container>
          <Table>
            <Row className={`${this.state.colpadding}`}>
              <Col className={`${this.state.colpadding} h5 text-center`}>
                {`Please fill the details of the '${category}' you want to '${adverttype}'`}
              </Col>
            </Row>
            <Row>
              <Col className={`text-center`}>
                {/* arrow indicator */}
                <div className="d-flex bg-highlight">
                  <div className="px-2 flex-fill"></div>
                  <div className="px-2 flex-fill"></div>
                  <div className="px-2 flex-fill">
                    <FontAwesomeIcon
                      style={{ color: "#6DB65B" }}
                      icon={faCaretDown}
                      size="2x"
                      title="This is where you are now."
                    />
                  </div>
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
                  <div id="step2" className="progressinactive p-2 flex-fill">
                    <Link
                      to="/postad/category"
                      className={`progresslink ${this.state.navlinkclass}`}
                    >
                      Step 2:- Pick Category
                    </Link>
                  </div>
                  <div id="step3" className="progressactive p-2 flex-fill">
                    Step 3:- Fill Details
                  </div>
                  <div id="step3" className="progressinactive p-2 flex-fill">
                    Step 4:- Upload images
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form onSubmit={this.handleFormSubmit}>
                  <Table>
                    <Row>
                      <Form.Group
                        as={Col}
                        xs={12}
                        md={6}
                        controlId="formGridState"
                        className={`${this.state.colpadding}`}
                      >
                        <Form.Label>District</Form.Label>
                        <Form.Control
                          as="select"
                          name="district"
                          onChange={this.handleDistrictChange}
                        >
                          <option key="" value="">
                            -- Please select a district --
                          </option>
                          {districts.map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </Form.Control>
                        {errors && errors.district && (
                          <Alert
                            className={`${this.state.colpadding}`}
                            variant="danger"
                          >{`${errors.district}`}</Alert>
                        )}
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={12}
                        md={6}
                        controlId="formGridState"
                        className={`${this.state.colpadding}`}
                      >
                        <Form.Label>City</Form.Label>
                        {this.state.selecteddistrict !== "" &&
                          cities &&
                          cities.length > 0 && (
                            <Form.Control
                              as="select"
                              name="city"
                              onChange={this.handleChange}
                            >
                              <option key="" value="">
                                -- Please select a city --
                              </option>
                              {cities.map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                            </Form.Control>
                          )}
                        {this.state.selecteddistrict === "" && (
                          <Form.Control as="select">
                            <option key="nocity" value="nocity">
                              -- Please select a district first --
                            </option>
                          </Form.Control>
                        )}
                        {errors && errors.city && (
                          <Alert
                            className={`${this.state.colpadding}`}
                            variant="danger"
                          >{`${errors.city}`}</Alert>
                        )}
                      </Form.Group>
                    </Row>

                    {/* land type */}

                    {isLand && (
                      <Row className="my-2">
                        <Col className="my-2" xs={12}>
                          Land Type
                        </Col>
                        <Col className="my-2" xs={12}>
                          {landTypes.map((landtype) => (
                            <Form.Check
                              inline
                              label={landtype}
                              key={landtype}
                              value={landtype}
                              type="checkbox"
                              id={`inline-checkbox-1`}
                              onChange={this.toggleCheckbox}
                              className="mx-1"
                            />
                          ))}
                        </Col>
                        <Col className="my-2" xs={12}>
                          {errors && errors.landtypes && (
                            <Alert
                              className={`${this.state.colpadding}`}
                              variant="danger"
                            >{`${errors.landtypes}`}</Alert>
                          )}
                        </Col>
                      </Row>
                    )}

                    {/* end of land type */}

                    {/* baths & beds  */}
                    {(isApartment ||
                      isHouse ||
                      isHolidayShortRental ||
                      isRoomorAnnexe ||
                      isCommercialProperty) && (
                      <Row>
                        {/* beds and baths only for apartments and house */}
                        {(isApartment ||
                          isHouse ||
                          isHolidayShortRental ||
                          isRoomorAnnexe) && (
                          <React.Fragment>
                            <Form.Group
                              as={Col}
                              xs={12}
                              md={4}
                              className={`${this.state.colpadding}`}
                              controlId="formGridState"
                            >
                              <Form.Label>No of Bedrooms</Form.Label>
                              {bathsbeds && bathsbeds.length > 0 && (
                                <Form.Control
                                  as="select"
                                  name="beds"
                                  onChange={this.handleChange}
                                >
                                  <option key="" value="">
                                    -- Please select no of bedrooms --
                                  </option>
                                  {bathsbeds.map((bathsbedsize) => (
                                    <option
                                      key={bathsbedsize}
                                      value={bathsbedsize}
                                    >
                                      {bathsbedsize}
                                    </option>
                                  ))}
                                </Form.Control>
                              )}
                              {errors && errors.beds && (
                                <Alert
                                  className={`${this.state.colpadding}`}
                                  variant="danger"
                                >{`${errors.beds}`}</Alert>
                              )}
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              xs={12}
                              md={4}
                              className={`${this.state.colpadding}`}
                              controlId="formGridState"
                            >
                              <Form.Label>No of Bathrooms</Form.Label>
                              {bathsbeds && bathsbeds.length > 0 && (
                                <Form.Control
                                  as="select"
                                  name="baths"
                                  onChange={this.handleChange}
                                >
                                  <option key="" value="">
                                    -- Please select no of bathrooms --
                                  </option>
                                  {bathsbeds.map((bathsbedsize) => (
                                    <option
                                      key={bathsbedsize}
                                      value={bathsbedsize}
                                    >
                                      {bathsbedsize}
                                    </option>
                                  ))}
                                </Form.Control>
                              )}
                              {errors && errors.baths && (
                                <Alert
                                  className={`${this.state.colpadding}`}
                                  variant="danger"
                                >{`${errors.baths}`}</Alert>
                              )}
                            </Form.Group>
                          </React.Fragment>
                        )}

                        {/* end of beds and bathrooms for apartments and house */}

                        {/* size */}

                        {(isApartment || isHouse || isCommercialProperty) && (
                          <FormGroup
                            as={Col}
                            xs={12}
                            md={`${gridsize}`}
                            className={`${this.state.colpadding}`}
                          >
                            <Form.Label>{`${category} Size `}</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Size (sq.ft)"
                              name="size"
                              step="0.1"
                              onChange={this.handleChange}
                            />
                            {errors && errors.size && (
                              <Alert
                                className={`${this.state.colpadding}`}
                                variant="danger"
                              >{`${errors.size}`}</Alert>
                            )}
                          </FormGroup>
                        )}

                        {/* end of size */}

                        {/* property type Holiday and Short Rentals */}

                        {isHolidayShortRental && (
                          <Form.Group
                            as={Col}
                            xs={12}
                            md={`${gridsize}`}
                            className={`${this.state.colpadding}`}
                            controlId="holidayresoty_propertytype"
                          >
                            <Form.Label>Property Type</Form.Label>
                            {propertytype_holidayshortrental &&
                              propertytype_holidayshortrental.length > 0 && (
                                <Form.Control
                                  as="select"
                                  name="propertytype"
                                  onChange={this.handleChange}
                                >
                                  <option key="" value="">
                                    -- Please select a Property type --
                                  </option>
                                  {propertytype_holidayshortrental.map(
                                    (propertytype) => (
                                      <option
                                        key={propertytype}
                                        value={propertytype}
                                      >
                                        {propertytype}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              )}
                            {errors && errors.propertytype && (
                              <Alert
                                className={`${this.state.colpadding}`}
                                variant="danger"
                              >{`${errors.propertytype}`}</Alert>
                            )}
                          </Form.Group>
                        )}

                        {/* end of property type Holiday and Short Rentals */}

                        {/* property type for Room or Annex  */}
                        {isRoomorAnnexe && (
                          <Form.Group
                            as={Col}
                            xs={12}
                            md={`${gridsize}`}
                            className={`${this.state.colpadding}`}
                            controlId="holidayresoty_propertytype"
                          >
                            <Form.Label>Property Type</Form.Label>
                            {propertytype_holidayshortrental &&
                              propertytype_holidayshortrental.length > 0 && (
                                <Form.Control
                                  as="select"
                                  name="propertytype"
                                  onChange={this.handleChange}
                                >
                                  <option key="" value="">
                                    -- Please select a Property type --
                                  </option>
                                  {propertytype_roomannex.map(
                                    (propertytype) => (
                                      <option
                                        key={propertytype}
                                        value={propertytype}
                                      >
                                        {propertytype}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              )}
                            {errors && errors.propertytype && (
                              <Alert
                                className={`${this.state.colpadding}`}
                                variant="danger"
                              >{`${errors.propertytype}`}</Alert>
                            )}
                          </Form.Group>
                        )}
                        {/* end of property type for Room or Annex */}

                        {/* property type commercial */}

                        {isCommercialProperty && (
                          <Form.Group
                            as={Col}
                            xs={12}
                            md={6}
                            className={`${this.state.colpadding}`}
                            controlId="formGridState"
                          >
                            <Form.Label>Property Type</Form.Label>
                            {propertytype_commercialproperty &&
                              propertytype_commercialproperty.length > 0 && (
                                <Form.Control
                                  as="select"
                                  name="propertytype"
                                  onChange={this.handleChange}
                                >
                                  <option key="" value="">
                                    -- Please select a Property type --
                                  </option>
                                  {propertytype_commercialproperty.map(
                                    (propertytype) => (
                                      <option
                                        key={propertytype}
                                        value={propertytype}
                                      >
                                        {propertytype}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              )}
                            {errors && errors.propertytype && (
                              <Alert
                                className={`${this.state.colpadding}`}
                                variant="danger"
                              >{`${errors.propertytype}`}</Alert>
                            )}
                          </Form.Group>
                        )}
                      </Row>
                    )}
                    {/* end of bath and beds */}

                    {/* land size and unit */}

                    {(isLand || isHouse) && (
                      <Row>
                        <FormGroup
                          as={Col}
                          xs={12}
                          md={6}
                          className={`${this.state.colpadding}`}
                        >
                          <Form.Label>Land Size</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Land Size"
                            name="landsize"
                            step="0.1"
                            onChange={this.handleChange}
                          />
                          {errors && errors.landsize && (
                            <Alert
                              className={`${this.state.colpadding}`}
                              variant="danger"
                            >{`${errors.landsize}`}</Alert>
                          )}
                        </FormGroup>
                        <Form.Group
                          as={Col}
                          xs={12}
                          md={6}
                          className={`${this.state.colpadding}`}
                          controlId="formGridState"
                        >
                          <Form.Label>Land Size Unit</Form.Label>
                          {landSizes && landSizes.length > 0 && (
                            <Form.Control
                              as="select"
                              name="landsizeunit"
                              onChange={this.handleChange}
                            >
                              <option key="" value="">
                                -- Please select a unit --
                              </option>
                              {landSizes.map((landSize) => (
                                <option key={landSize} value={landSize}>
                                  {landSize}
                                </option>
                              ))}
                            </Form.Control>
                          )}
                          {errors && errors.landsizeunit && (
                            <Alert
                              className={`${this.state.colpadding}`}
                              variant="danger"
                            >{`${errors.landsizeunit}`}</Alert>
                          )}
                        </Form.Group>
                      </Row>
                    )}

                    {/* end of land size and unit */}

                    {/* end of property type commercial */}

                    <Row>
                      <Form.Group
                        as={Col}
                        xs={12}
                        className={`${this.state.colpadding}`}
                        controlId="formGridAddress1"
                      >
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          placeholder="Address (optional)"
                          name="address"
                          onChange={this.handleChange}
                        />
                        {errors && errors.address && (
                          <Alert
                            className={`${this.state.colpadding}`}
                            variant="danger"
                          >{`${errors.address}`}</Alert>
                        )}
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        xs={12}
                        className={`${this.state.colpadding}`}
                        controlId="formGridAddress1"
                      >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          placeholder="Title"
                          name="title"
                          onChange={this.handleChange}
                        />
                        {errors && errors.title && (
                          <Alert
                            className={`${this.state.colpadding}`}
                            variant="danger"
                          >{`${errors.title}`}</Alert>
                        )}
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        xs={12}
                        className={`${this.state.colpadding}`}
                        controlId="formGridAddress1"
                      >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="description"
                          rows="8"
                          placeholder="Description"
                          onChange={this.handleChange}
                        />
                        {errors && errors.description && (
                          <Alert
                            className={`${this.state.colpadding}`}
                            variant="danger"
                          >{`${errors.description}`}</Alert>
                        )}
                      </Form.Group>
                    </Row>

                    {/* start of price  */}

                    <Row className="d-flex flex-column flex-md-row align-items-center">
                      <Form.Group
                        as={Col}
                        xs={12}
                        md={4}
                        className={`${this.state.colpadding}`}
                        controlId="formGridAddress1"
                      >
                        <Form.Label>{`${pricelabel}`}</Form.Label>
                        <Form.Control
                          placeholder={`${pricelabel}`}
                          onChange={this.handleChange}
                          name="rentaloprice"
                          type="number"
                        />
                        {errors && errors.rentaloprice && (
                          <Alert
                            className={`${this.state.colpadding}`}
                            variant="danger"
                          >{`${errors.rentaloprice}`}</Alert>
                        )}
                      </Form.Group>
                      {category === "Land" &&
                        adverttype === "sell" &&
                        priceUnits &&
                        priceUnits.length > 0 && (
                          <Form.Group
                            as={Col}
                            xs={12}
                            md={4}
                            className={`${this.state.colpadding}`}
                            controlId="formGridAddress1"
                          >
                            <Form.Label>Unit</Form.Label>
                            <Form.Control
                              as="select"
                              onChange={this.handleChange}
                              name="rentalopriceunit"
                            >
                              <option key="" value="">
                                -- Please select a unit --
                              </option>
                              {priceUnits.map((priceUnit) => (
                                <option key={priceUnit} value={priceUnit}>
                                  {priceUnit}
                                </option>
                              ))}
                            </Form.Control>
                            {errors && errors.rentalopriceunit && (
                              <Alert
                                className={`${this.state.colpadding}`}
                                variant="danger"
                              >{`${errors.rentalopriceunit}`}</Alert>
                            )}
                          </Form.Group>
                        )}
                      <Form.Group
                        as={Col}
                        xs={12}
                        md={4}
                        className={`${this.state.colpadding} mt-md-4 mb-md-1`}
                        controlId="formGridAddress1"
                      >
                        <Form.Label className={`px-2`}>
                          Price Negotiable?
                        </Form.Label>
                        <Form.Check
                          inline
                          label="Yes / No"
                          type="checkbox"
                          name="rentalopricenegotiable"
                          value="false"
                          className={`px-2`}
                          onChange={this.toggleNegotiableCheckBox}
                        />
                      </Form.Group>
                    </Row>
                    {/* end of price */}
                    <div
                      id="addetailscontactus"
                      className=" addetailscontactus-background1 py-3 shadow"
                    >
                      <div>
                        {" "}
                        <h5>Contact Details</h5>{" "}
                      </div>
                      <div className="d-flex flex-column flex-md-row">
                        <div className="p-2 flex-fill">
                          <div className="d-flex flex-column flex-md-row">
                            <div className="p-2 flex-fill">Name :- {name} </div>
                          </div>
                        </div>
                        <div className="p-2 flex-fill">
                          <div className="d-flex flex-column flex-md-row">
                            <div className="p-2 flex-fill">
                              E mail :- {email}
                            </div>
                          </div>
                        </div>
                        <div className="p-2 flex-fill">
                          <div className="d-flex flex-column flex-md-row">
                            <div className="p-2 flex-fill">
                              Telephone Number :-{" "}
                              {`${phonenumber} (${phonenumberconfirmedstr})`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {this.state.showAlert && (
                      <React.Fragment>
                        <div class="d-flex p-2">
                          <Toast
                            id="toast"
                            onClose={this.handleAlertClose}
                            show={this.showAlert}
                            animation={true}
                            delay={3000}
                            autohide
                            className="text-white shadow"
                          >
                            <Toast.Header className="text-white">
                              <strong className="mr-auto">Error</strong>
                            </Toast.Header>
                            <Toast.Body>
                              There are few erros. Please correct them.
                            </Toast.Body>
                          </Toast>
                        </div>
                      </React.Fragment>
                    )}
                    <Row className="p-2">
                      <Col className="py-3">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={this.handleShow}
                        >
                          Save & Upload Images
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          type="submit"
                          id="btnsubmit"
                          hidden="hidden"
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Table>
                  <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Important !!!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h4>Read carefully and decide.</h4>
                      Once you save the details you cannot change it until we
                      review and approve them or reject for you to edit details.
                      Please make sure, you have entered all the details
                      correctly. Please confirm that you want to save details
                      and move on to uplod images in next step. Are you sure?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="info"
                        onClick={this.handleClose}
                        disabled={loading}
                      >
                        Let me check once a again
                      </Button>
                      {loading && <loader />}

                      <Button
                        variant="primary"
                        onClick={this.handleSave}
                        disabled={loading}
                      >
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          size="1x"
                          title="Yes Sure"
                        />{" "}
                        Yes I am sure
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Form>
              </Col>
            </Row>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

AddAdvertDetails.propTypes = {
  addAdvert: PropTypes.func.isRequired,
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
  validateAdvertProperty,
  IsvalidAdvert,
  clearErrosPageLoad,
};

export default connect(mapStateToProps, mapActionsToProps)(AddAdvertDetails);
