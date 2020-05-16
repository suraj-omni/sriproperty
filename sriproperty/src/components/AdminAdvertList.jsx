import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import {
  ADVERT_STATUS_NEW,
  ADVERT_STATUS_EDIT,
  ADVERT_STATUS_EXPIRED,
  ADVERT_STATUS_LIVE,
  ADVERT_STATUS_NEEDEDIT,
  ADVERT_STATUS_INREVIEW,
  PAYMENT_STATUS_FREE,
  PAYMENT_STATUS_NOTPAID,
  PAYMENT_STATUS_PAID,
  PAYMENT_STATUS_MEMBERSHIP,
} from "../redux/types";
import { getAdminSearchAdverts } from "../redux/actions/adActions";

const shortid = require("shortid");

const config = require("../util/config");

export class AdminAdvertList extends Component {
  state = {
    colpadding: "p-2",
    advertStatusList: [
      { value: ADVERT_STATUS_NEW, label: ADVERT_STATUS_NEW },
      { value: ADVERT_STATUS_EDIT, label: ADVERT_STATUS_EDIT },
      { value: ADVERT_STATUS_INREVIEW, label: ADVERT_STATUS_INREVIEW },
      { value: ADVERT_STATUS_NEEDEDIT, label: ADVERT_STATUS_NEEDEDIT },
      { value: ADVERT_STATUS_LIVE, label: ADVERT_STATUS_LIVE },
      { value: ADVERT_STATUS_EXPIRED, label: ADVERT_STATUS_EXPIRED },
    ],
    selectedAdvertStatus: null,
    paymentStatuslist: [
      { value: PAYMENT_STATUS_FREE, label: PAYMENT_STATUS_FREE },
      { value: PAYMENT_STATUS_NOTPAID, label: PAYMENT_STATUS_NOTPAID },
      { value: PAYMENT_STATUS_PAID, label: PAYMENT_STATUS_PAID },
      { value: PAYMENT_STATUS_MEMBERSHIP, label: PAYMENT_STATUS_MEMBERSHIP },
    ],
    keyBasedSeachList: [
      { value: "advertid", label: "Advert Id" },
      { value: "email", label: "E mail" },
      { value: "phonenumber1", label: "Phone Number" },
    ],
    selectedPaymentStatus: "",
    selectedKeyBasedSearchField: "",
    fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    toDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
      23,
      59
    ),
  };

  generateJSON = () => {
    console.log(JSON.stringify(config.anuradhapuraCities));
  };

  handelSearch = () => {
    let advertStatus = [];

    this.state.selectedAdvertStatus.map((adtype) => {
      //console.log(adtype);
      advertStatus.push(adtype.value);
    });

    //console.log(advertStatus);

    const fromDate = new Date(this.state.fromDate).toISOString();
    const toDate = new Date(this.state.toDate).toISOString();
    const searchParams = {
      advertStatus: advertStatus,
      fromDate: fromDate,
      toDate: toDate,
      sortBy: "createdAt",
      sortOrder: "desc",
    };

    console.log(JSON.stringify(searchParams));
    this.props.getAdminSearchAdverts(searchParams);
  };

  handleAdvertStatusChange = (selectedAdvertStatus) => {
    this.setState({ selectedAdvertStatus });
  };

  handlePaymentStatusChange = (selectedPaymentStatus) => {
    this.setState({ selectedPaymentStatus });
  };

  handleKeyBasedSearchFieldChange = (selectedKeyBasedSearchField) => {
    this.setState({ selectedKeyBasedSearchField });
  };

  handleFromDateChange = (date) => {
    this.setState({
      fromDate: date,
    });
  };

  handleToDateChange = (date) => {
    this.setState({
      toDate: date,
    });
  };

  render() {
    const adverts = [...this.props.adverts];
    console.log("render", adverts);
    const count = this.props.ad.advertscount;
    return (
      <React.Fragment>
        <Container
          id="searchcontainer"
          className="mx-auto my-3 p-2 adminlist-search-container"
        >
          <Accordion id="searchboxaccording" defaultActiveKey="0">
            <Card>
              <Card.Header>
                <SearchToggle id="serachtoggle" eventKey="0">
                  Click to Collapse Search Area
                </SearchToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Table>
                    <Row>
                      <Col xs={12}>
                        <h5>Search Criterias</h5>
                      </Col>
                    </Row>
                    <div className={`text-center d-flex`}>
                      <Table>
                        <Row xs={12} className={`text-center mx-auto`}>
                          <Col
                            className={`${this.state.colpadding}  text-center margin-auto flex-fill`}
                            colspan="2"
                          >
                            Search Based on Unique Key
                          </Col>
                        </Row>
                        <Row className={`text-center mx-auto`}>
                          <Col
                            xs={12}
                            md={2}
                            className={`${this.state.colpadding} text-md-right text-xs-center flex-fill align-middle my-auto`}
                          >
                            Select Field :
                          </Col>
                          <Col
                            xs={12}
                            md={4}
                            className={`${this.state.colpadding} text-center flex-fill  align-middle my-auto`}
                          >
                            <Select
                              name="uniqueKey"
                              options={this.state.keyBasedSeachList}
                              classNamePrefix=""
                              className="searchcontrol-select"
                              value={this.state.selectedKeyBasedSearchField}
                              onChange={this.handleKeyBasedSearchFieldChange}
                            />
                          </Col>

                          <Col
                            xs={12}
                            md={6}
                            className={`${this.state.colpadding} text-center flex-fill  align-middle my-auto`}
                          >
                            <InputGroup size="sm">
                              <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">
                                  {this.state.selectedKeyBasedSearchField.label}
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </InputGroup>
                          </Col>
                        </Row>
                      </Table>
                    </div>

                    {/* multiple choice search */}
                    <div className={`text-center d-flex`}>
                      <Table>
                        <Row xs={12} className={`text-center mx-auto`}>
                          <Col
                            className={`${this.state.colpadding}  text-center margin-auto flex-fill`}
                            colspan="2"
                          >
                            Search Based on Miltiple Choices
                          </Col>
                        </Row>
                        {/* types search */}
                        <Row
                          className={`${this.state.colpadding} text-center mx-auto`}
                        >
                          <Col
                            className={`${this.state.colpadding} text-md-right flex-fill text-xs-center`}
                            xs={12}
                            md={2}
                          >
                            Advert Status :
                          </Col>
                          <Col
                            className={`${this.state.colpadding} text-center flex-fill`}
                            xs={12}
                            md={4}
                          >
                            <Select
                              name="advertStatus"
                              options={this.state.advertStatusList}
                              isMulti="true"
                              isSearchable="true"
                              classNamePrefix="searchloc"
                              className="searchcontrol-select"
                              value={this.state.selectedAdvertStatus}
                              onChange={this.handleAdvertStatusChange}
                            />
                          </Col>
                          <Col
                            className={`${this.state.colpadding} text-md-right flex-fill text-xs-center`}
                            xs={12}
                            md={2}
                          >
                            Payment Status :
                          </Col>
                          <Col
                            className={`${this.state.colpadding} text-center flex-fill`}
                            xs={12}
                            md={4}
                          >
                            <Select
                              name="paymentStatus"
                              options={this.state.paymentStatuslist}
                              isMulti="true"
                              isSearchable="true"
                              classNamePrefix=""
                              className="searchcontrol-select"
                              value={this.state.selectedPaymentStatus}
                              onChange={this.handlePaymentStatusChange}
                            />
                          </Col>
                        </Row>
                        {/* end of types search */}
                        {/* Date Search */}
                        <Row
                          className={`${this.state.colpadding} mx-auto text-center`}
                        >
                          <Col
                            className={`${this.state.colpadding} flex-fill text-md-right text-xs-center`}
                            xs={12}
                            md={2}
                          >
                            Created From :
                          </Col>
                          <Col
                            className={`${this.state.colpadding} flex-fill text-center mx-auto`}
                            xs={12}
                            md={4}
                          >
                            <DatePicker
                              selected={this.state.fromDate}
                              onChange={this.handleFromDateChange}
                              className="searchcontrol-select"
                              popperPlacement="top-end"
                            />
                          </Col>
                          <Col
                            className={`${this.state.colpadding} flex-fill text-md-right text-xs-center`}
                            xs={12}
                            md={2}
                          >
                            Created To :
                          </Col>
                          <Col
                            className={`${this.state.colpadding} flex-fill text-center`}
                            xs={12}
                            md={4}
                          >
                            <DatePicker
                              selected={this.state.toDate}
                              onChange={this.handleToDateChangeDateChange}
                              className="searchcontrol-select"
                            />
                          </Col>
                        </Row>
                        {/* end of date search */}
                      </Table>
                    </div>
                    {/* end of multiple choice search */}
                    <div className={`text-center d-flex`}>
                      <Table>
                        <Row>
                          <Col>
                            {" "}
                            <Button
                              id="btnsearch"
                              size="sm"
                              variant="primary"
                              onClick={this.handelSearch}
                            >
                              Search Adverts
                            </Button>
                            <Button
                              id="btngenerate"
                              size="sm"
                              variant="primary"
                              onClick={this.generateJSON}
                            >
                              Generate
                            </Button>
                          </Col>
                        </Row>
                      </Table>
                    </div>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>

        {adverts && count > 0 && (
          <React.Fragment>
            <Container
              id="searchcontainer"
              className="mx-auto my-3 p-2 adminlist-search-container"
            >
              <div>{`Showing Total of ${count} Ad's`}</div>
              <Table responsive size="sm" striped bordered hover>
                <thead>
                  <tr className="text-center">
                    <th>Customer Ref #</th>
                    <th>Title</th>
                    <th>E mail</th>
                    <th>Phone Number</th>
                    <th>Modified At</th>
                    <th>Payment Status</th>
                    <th>Status</th>
                    <th>Online</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {adverts.map((advert, index) => (
                    <tr>
                      <td className="text-left align-middle">
                        <Link target="_blank" to={`/ad/${advert.advertId}`}>
                          {advert.customerRefNo}
                        </Link>
                      </td>
                      <td className="text-left align-middle">
                        <Link target="_blank" to={`/ad/${advert.advertId}`}>
                          {advert.title}
                        </Link>
                      </td>
                      <td className="text-center align-middle">
                        {advert.email}
                      </td>
                      <td className="text-center align-middle">
                        {advert.phonenumber1}
                      </td>
                      <td className="text-center align-middle">
                        {advert.modifiedAt}
                      </td>
                      <td className="text-center align-middle">
                        {advert.paymentStatus}
                      </td>
                      <td className="text-center align-middle">
                        {advert.advertStatus}
                      </td>
                      <td className="text-center align-middle">
                        {advert.online && (
                          <FontAwesomeIcon
                            style={{ color: "#99c24d" }}
                            icon={faToggleOn}
                            size="1.8x"
                            title="Ad is Online"
                          />
                        )}
                        {!advert.online && (
                          <FontAwesomeIcon
                            style={{ color: "#CE6C47" }}
                            icon={faToggleOff}
                            size="1.8x"
                            title="Ad is Offline"
                          />
                        )}
                      </td>
                      <td className="text-center align-middle">
                        {!(
                          advert.advertStatus === ADVERT_STATUS_LIVE ||
                          advert.advertStatus === ADVERT_STATUS_EXPIRED ||
                          (advert.advertStatus === ADVERT_STATUS_NEEDEDIT &&
                            advert.paymentStatus === PAYMENT_STATUS_FREE)
                        ) && (
                          <React.Fragment>
                            <Link to={`/adreview/${advert.advertId}`}>
                              {" "}
                              <FontAwesomeIcon
                                style={{ color: "#1c110a" }}
                                icon={faUserCheck}
                                size="1x"
                                title="Review Ad"
                              />
                            </Link>
                          </React.Fragment>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

AdminAdvertList.propTypes = {
  getAdminSearchAdverts: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  adverts: PropTypes.object.isRequired,
  ad: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI,
  ad: state.ad,
  adverts: state.ad.adverts,
});

const mapActionsToProps = {
  getAdminSearchAdverts,
};

function SearchToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    let btn = document.getElementById("togglebutton");
    if (btn.innerHTML === "Click to Collapse Search Area") {
      btn.innerHTML = "Click to Expand Search Area";
    } else {
      btn.innerHTML = "Click to Collapse Search Area";
    }
  });

  return (
    <Button
      id="togglebutton"
      size="sm"
      variant="info"
      onClick={decoratedOnClick}
    >
      {" "}
      {children}
    </Button>
  );
}

export default connect(mapStateToProps, mapActionsToProps)(AdminAdvertList);
