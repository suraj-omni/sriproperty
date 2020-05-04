import React, { Component, Suspense } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import FormGroup from "react-bootstrap/FormGroup";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
import { ADVERT_STATUS_NEW, ADVERT_STATUS_EDIT } from "../redux/types";

const config = require("../util/config");

class AdvertDetailsMaster extends Component {
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
      showeditfinish: false,
      showedit: false,
      showAlert: false,
      pricelabel: "",
      gridforCategory: { "Commercial Property": 6 },
    };
  }

  handleClose = () => {
    this.setState({ show: false, showedit: false, showeditfinish: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleEditShow = () => {
    this.setState({ showedit: true });
  };

  handleEditFinishShow = () => {
    this.setState({ showeditfinish: true });
  };

  handleAlertClose = () => {
    this.setState({ showAlert: false });
  };

  handleAlertShow = () => {
    this.setState({ showAlert: true });
  };

  handleSave = () => {
    const submitbutton = document.getElementById("btnsubmit");
    //console.log(submitbutton);
    submitbutton.click();
  };

  handleEdit = (event) => {
    event.preventDefault();
    let advert = this.props.advert;
    advert["advertStatus"] = ADVERT_STATUS_EDIT;
    if (this.props.advert && this.props.advert.advertid)
      if (this.props.IsvalidAdvert(advert)) {
        this.props.editAdvert(advert, this.props.history, "/myads");
      } else {
        this.state.showedit = false;
        this.state.showAlert = true;
      }

    console.log(this.props.UI.errors);
  };

  handleEditUpload = (event) => {
    event.preventDefault();
    let advert = this.props.advert;
    advert["advertStatus"] = ADVERT_STATUS_EDIT;
    if (this.props.advert && this.props.advert.advertid)
      if (this.props.IsvalidAdvert(advert)) {
        this.props.editAdvert(
          advert,
          this.props.history,
          "/postad/uploadimage"
        );
      } else {
        this.state.showedit = false;
        this.state.showAlert = true;
      }

    console.log(this.props.UI.errors);
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
        return config.batticaloaCities;
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

  getPriceLabel = () => {
    let pricelabel = "";
    const { category, adverttype } = this.props.advert;
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

    return pricelabel;
  };

  handleDistrictChange = (event) => {
    const selecteddistrict = event.target.value;
    const cities = this.getCitiesbasedonDistrict(selecteddistrict);
    this.setState({ selecteddistrict, cities });

    const { name, value } = event.target;
    const errors = { ...this.props.UI.errors };
    this.props.validateAdvertProperty(name, value, errors);

    this.setPropertiestoAdvert(event.target.name, event.target.value);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
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
    let advert = this.props.advert;

    for (const landtype of this.selectedlandTypeCheckBoxes) {
      landtypes = landtypes.concat(landtype).concat(",");
    }
    advert["landtypes"] = `${landtypes}`;
    //this.setState({ advert });
    this.props.setAdvert(advert);
  };

  toggleNegotiableCheckBox = (event) => {
    let advert = this.props.advert;

    if (this.selectednegotiablecheckbox.has(event.target.value)) {
      this.selectednegotiablecheckbox.delete(event.target.value);
      advert["rentalopricenegotiable"] = false;
    } else {
      this.selectednegotiablecheckbox.add(event.target.value);
      advert["rentalopricenegotiable"] = true;
    }

    this.props.setAdvert(advert);
    //this.setState({ advert });
  };

  setPropertiestoAdvert = (name, value) => {
    let advert = this.props.advert;
    advert[`${name}`] = `${value}`;
    this.props.setAdvert(advert);
  };

  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();
    let advert = this.props.advert;
    advert["advertStatus"] = ADVERT_STATUS_NEW;

    if (this.props.advert)
      if (this.props.IsvalidAdvert(advert)) {
        this.props.addAdvert(advert, this.props.history);
      } else {
        this.state.show = false;
        this.state.showAlert = true;
      }

    console.log(this.props.UI.errors);
  };

  headerRowComponent = () => {
    const { adverttype, category } = this.props.advert;
    return (
      <React.Fragment>
        <Row className={`${this.state.colpadding}`}>
          <Col className={`${this.state.colpadding} h5 text-center`}>
            {`Please fill the details of the '${category}' you want to '${adverttype}'`}
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  progressIndicatorComponent = () => {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  };

  progressIndicator_Edit_Component = () => {
    return (
      <React.Fragment>
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
            Step 1:- Sell or Rent?
          </div>
          <div id="step2" className="progressinactive p-2 flex-fill">
            Step 2:- Pick Category
          </div>
          <div id="step3" className="progressactive p-2 flex-fill">
            Step 3:- Fill Details
          </div>
          <div id="step3" className="progressinactive p-2 flex-fill">
            Step 4:- Upload images
          </div>
        </div>
      </React.Fragment>
    );
  };

  render_Cities_Edit_Component = () => {
    const { errors } = this.props.UI;
    const { district, city } = this.props.advert;
    const cities = this.getCitiesbasedonDistrict(district);
    return (
      <React.Fragment>
        <Form.Group
          as={Col}
          xs={12}
          md={6}
          controlId="formGridState"
          className={`${this.state.colpadding}`}
        >
          <Form.Label>City</Form.Label>
          {district !== "" && cities && cities.length > 0 && (
            <Form.Control
              as="select"
              name="city"
              value={city}
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
          {district === "" && (
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
      </React.Fragment>
    );
  };

  render_Cities_Add_Component = () => {
    const { errors } = this.props.UI;
    const { selecteddistrict } = this.state;
    const cities = this.getCitiesbasedonDistrict(selecteddistrict);
    return (
      <React.Fragment>
        <Form.Group
          as={Col}
          xs={12}
          md={6}
          controlId="formGridState"
          className={`${this.state.colpadding}`}
        >
          <Form.Label>City</Form.Label>
          {selecteddistrict !== "" && cities && cities.length > 0 && (
            <Form.Control as="select" name="city" onChange={this.handleChange}>
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
          {selecteddistrict === "" && (
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
      </React.Fragment>
    );
  };

  render_District_Add_Component = () => {
    const { errors } = this.props.UI;
    const districts = config.districts;
    return (
      <React.Fragment>
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
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
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
        {/* <Form.Group
          as={Col}
          xs={12}
          md={6}
          controlId="formGridState"
          className={`${this.state.colpadding}`}
        >
          <Form.Label>City</Form.Label>
          {selecteddistrict !== "" && cities && cities.length > 0 && (
            <Form.Control
              as="select"
              name="city"
              value={city}
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
          {selecteddistrict === "" && (
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
        </Form.Group> */}
      </React.Fragment>
    );
  };

  render_District_Edit_Component = () => {
    const { errors } = this.props.UI;
    const districts = config.districts;
    const { district } = this.props.advert;

    return (
      <React.Fragment>
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
            value={district}
            onChange={this.handleDistrictChange}
          >
            <option key="" value="">
              -- Please select a district --
            </option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
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
      </React.Fragment>
    );
  };

  renderLandTypesComponent = () => {
    const landTypes = config.landTypes;
    const { errors } = this.props.UI;
    const { category, landtypes } = this.props.advert;

    const arrlandtypes = landtypes ? landtypes.split(",") : [];
    if (arrlandtypes && arrlandtypes.length > 0) {
      arrlandtypes.map((landtype) => {
        const cb = document.getElementById(landtype);
        //console.log("cb", cb);
        if (cb) {
          //console.log(cb);
          cb.checked = true;
        }
      });
    }

    const isLand = category === "Land" ? true : false;
    return (
      <React.Fragment>
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
                  id={`${landtype}`}
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
      </React.Fragment>
    );
  };

  renderBaths_Beds_Size_PropertyType_Component = () => {
    const { errors } = this.props.UI;
    const { category, size, baths, beds, propertytype } = this.props.advert;
    const isHouse = category === "House" ? true : false;
    const isApartment = category === "Apartment" ? true : false;
    const isHolidayShortRental =
      category === "Holiday and Short Rental" ? true : false;
    const isRoomorAnnexe = category === "Room or Annex" ? true : false;
    const isCommercialProperty =
      category === "Commercial Property" ? true : false;
    const bathsbeds = config.bathsbeds;
    const propertytype_commercialproperty =
      config.propertytype_commercialproperty;
    const propertytype_holidayshortrental =
      config.propertytype_holidayshortrental;
    const propertytype_roomannex = config.propertytype_roomannex;
    const gridsize = category === "Commercial Property" ? 6 : 4;
    return (
      <React.Fragment>
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
                      value={beds}
                      onChange={this.handleChange}
                    >
                      <option key="" value="">
                        -- Please select no of bedrooms --
                      </option>
                      {bathsbeds.map((bathsbedsize) => (
                        <option key={bathsbedsize} value={bathsbedsize}>
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
                      value={baths}
                      onChange={this.handleChange}
                    >
                      <option key="" value="">
                        -- Please select no of bathrooms --
                      </option>
                      {bathsbeds.map((bathsbedsize) => (
                        <option key={bathsbedsize} value={bathsbedsize}>
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
                  value={size}
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
                      value={propertytype}
                      onChange={this.handleChange}
                    >
                      <option key="" value="">
                        -- Please select a Property type --
                      </option>
                      {propertytype_holidayshortrental.map((propertytype) => (
                        <option key={propertytype} value={propertytype}>
                          {propertytype}
                        </option>
                      ))}
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
                      value={propertytype}
                      onChange={this.handleChange}
                    >
                      <option key="" value="">
                        -- Please select a Property type --
                      </option>
                      {propertytype_roomannex.map((propertytype) => (
                        <option key={propertytype} value={propertytype}>
                          {propertytype}
                        </option>
                      ))}
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
                      value={propertytype}
                      onChange={this.handleChange}
                    >
                      <option key="" value="">
                        -- Please select a Property type --
                      </option>
                      {propertytype_commercialproperty.map((propertytype) => (
                        <option key={propertytype} value={propertytype}>
                          {propertytype}
                        </option>
                      ))}
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
      </React.Fragment>
    );
  };

  renderLandSize_Unit_Component = () => {
    const { errors } = this.props.UI;
    const landSizes = config.landSizes;
    const { category, landsize, landsizeunit } = this.props.advert;
    const isLand = category === "Land" ? true : false;
    const isHouse = category === "House" ? true : false;
    return (
      <React.Fragment>
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
                value={landsize}
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
                  value={landsizeunit}
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
      </React.Fragment>
    );
  };

  render_Desc_Title_Address_Component = () => {
    const { errors } = this.props.UI;
    const { address, title, description } = this.props.advert;
    return (
      <React.Fragment>
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
              value={address}
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
              value={title}
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
              value={description}
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
      </React.Fragment>
    );
  };

  render_Price_Component = () => {
    let pricelabel = this.getPriceLabel();
    pricelabel = pricelabel === "" ? "Price" : pricelabel;

    const {
      adverttype,
      category,
      rentaloprice,
      rentalopriceunit,
      rentalopricenegotiable,
    } = this.props.advert;

    const { errors } = this.props.UI;
    const priceUnits = config.priceUnits;

    return (
      <React.Fragment>
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
              value={rentaloprice}
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
                  value={rentalopriceunit}
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
            controlId="chkNegotiable"
          >
            <Form.Label className={`px-2`}>Price Negotiable?</Form.Label>
            <Form.Check
              inline
              label="Yes / No"
              type="checkbox"
              name="rentalopricenegotiable"
              className={`px-2`}
              checked={rentalopricenegotiable}
              onChange={this.toggleNegotiableCheckBox}
            />
          </Form.Group>
        </Row>
      </React.Fragment>
    );
  };

  render_ContactDetails_Component = () => {
    const { phonenumber, email, name } = this.props.credentials;
    const { phonenumberconfirmed } = this.props.credentials;
    const phonenumberconfirmedstr = phonenumberconfirmed
      ? "Confirmed"
      : "Not confirmed";
    return (
      <React.Fragment>
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
                <div className="p-2 flex-fill">E mail :- {email}</div>
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
      </React.Fragment>
    );
  };

  render_Alert_Component = () => {
    const showAlert = this.state.showAlert;

    return (
      <React.Fragment>
        {showAlert && (
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
      </React.Fragment>
    );
  };

  render_Save_Component = () => {
    return (
      <React.Fragment>
        <Row className="p-2">
          <Col className="py-3">
            <Button
              variant="primary"
              type="submit"
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
      </React.Fragment>
    );
  };

  render_Edit_Save_Component = () => {
    return (
      <React.Fragment>
        <Row className="p-2">
          <Col xs={12} md={6} className="py-3 text-md-right text-xs-center">
            <Button
              variant="primary"
              size="sm"
              onClick={this.handleEditFinishShow}
            >
              Finish Editing Ad
            </Button>
          </Col>
          <Col xs={12} md={6} className="py-3 text-md-left text-xs-center">
            <Button variant="primary" size="sm" onClick={this.handleEditShow}>
              Save & Continue to Upload Images
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  render_Popup_Modal = () => {
    const { loading } = this.props.UI;
    return (
      <React.Fragment>
        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Important !!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Read carefully and decide.</h4>
            Once you save the details you cannot change it until we review and
            approve them or reject for you to edit details. Please make sure,
            you have entered all the details correctly. Please confirm that you
            want to save details and move on to uplod images in next step. Are
            you sure?
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
              <FontAwesomeIcon icon={faThumbsUp} size="1x" title="Yes Sure" />{" "}
              Yes I am sure
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  };

  render_Popup_EditFinish_Modal = () => {
    const { loading } = this.props.UI;
    return (
      <React.Fragment>
        <Modal
          show={this.state.showeditfinish}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Important !!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Read carefully and decide.</h4>
            Please make sure, you have correctly edited the problems identified
            in the review process. Please confirm that you want to save details
            and complete the editing. Are you sure?
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
              type="submit"
              onClick={this.handleEdit}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faThumbsUp} size="1x" title="Yes Sure" />{" "}
              Yes I am sure
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  };

  render_Popup_Edit_Modal = () => {
    const { loading } = this.props.UI;
    return (
      <React.Fragment>
        <Modal show={this.state.showedit} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Important !!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Read carefully and decide.</h4>
            You will be taken to Image upload in next step. Please make sure,
            you have correctly edited the problems identified in the review
            process. Please confirm that you want to save details and complete
            the editing. Are you sure?
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
              type="submit"
              variant="primary"
              onClick={this.handleEditUpload}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faThumbsUp} size="1x" title="Yes Sure" />{" "}
              Yes I am sure
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  };

  /*   render() {
    const { errors, loading } = this.props.UI;
    const { adverttype, category } = this.props.advert;
    const isLand = category === "Land" ? true : false;
    const isHouse = category === "House" ? true : false;
    const isApartment = category === "Apartment" ? true : false;
    const isHolidayShortRental =
      category === "Holiday and Short Rental" ? true : false;
    const isRoomorAnnexe = category === "Room or Annex" ? true : false;
    const isCommercialProperty =
      category === "Commercial Property" ? true : false;
    const pricelabel = this.state.pricelabel;
    const priceUnits = config.priceUnits;
    const landTypes = config.landTypes;

    const landSizes = config.landSizes;

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

    return <></>;
  } */
}

export default AdvertDetailsMaster;
