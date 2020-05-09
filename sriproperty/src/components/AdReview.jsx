import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  startReviewAdvert,
  validateAdvertReviewComment,
  setAdvert,
  commentReviewAdvert,
  IsvalidAdvertReviewComment,
  validateAdvertProperty,
  setAdvertPayment,
  getPreloadDataforAdvertReview,
  IsvalidAdvertPayment,
  addAdvertPayment,
  goLiveAdvert,
  updatePaymentStatusAdvert,
} from "../redux/actions/adActions";

import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import DatePicker from "react-datepicker";

import moment from "moment/moment";

import {
  ADVERT_STATUS_INREVIEW,
  ADVERT_STATUS_NEEDEDIT,
  ADVERT_STATUS_LIVE,
  ADVERT_STATUS_NEW,
  ADVERT_STATUS_EDIT,
  ADVERT_STATUS_EXPIRED,
  PAYMENT_STATUS_PAID,
  PAYMENT_STATUS_NOTPAID,
  PAYMENT_STATUS_FREE,
  PAYMENT_STATUS_MEMBERSHIP,
} from "../redux/types";

export class AdReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowClass: "mx-auto d-flex text-xs-center",
      colClass: "p-2 flex-fill text-xs-center",
      containerClass: "mx-auto my-3 p-2 adminlist-search-container",
      paymentTypes: ["Cash", "Online", "Bank Deposit"],
    };
  }

  componentDidMount = async () => {
    const advert = { advertid: this.props.match.params.id };
    if (advert.advertid) {
      await this.props.getPreloadDataforAdvertReview(advert);
      console.log(this.props.paymentDate);
    }
  };

  handleCommentChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.props.UI.errors };
    this.props.validateAdvertReviewComment(name, value, errors);
    this.setPropertiestoAdvert(name, value);
  };

  handlePaymentDateChange = (date) => {
    const errors = { ...this.props.UI.errors };
    this.props.validateAdvertProperty("paymentDate", date, errors);

    this.setPropertiestoAdvertPayment("paymentDate", moment(date).toDate());
  };

  handlePaymentChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.props.UI.errors };
    this.props.validateAdvertProperty(name, value, errors);
    this.setPropertiestoAdvertPayment(name, value);
  };

  setPropertiestoAdvertPayment = (name, value) => {
    try {
      let advertpayment = this.props.advertpayment;
      advertpayment[`${name}`] = `${value}`;
      console.log("asa", JSON.stringify(advertpayment));
      this.props.setAdvertPayment(advertpayment);
    } catch (err) {
      console.log("setPropertiestoAdvertPayment", err);
    }
  };

  handleSaveComments = (saveCommentEvent) => {
    saveCommentEvent.preventDefault();
    let advert = this.props.advert;

    if (this.props.advert)
      if (this.props.IsvalidAdvertReviewComment(advert.adminComments)) {
        console.log("calling save");
        this.props.commentReviewAdvert(advert);
      }

    console.log(this.props.UI.errors);
  };

  handleUpdatePaymentStatus = (updatePaymentStatusEvent) => {
    updatePaymentStatusEvent.preventDefault();
    let advert = this.props.advert;

    if (this.props.advert && this.props.advert.advertid !== undefined) {
      advert["paymentStatus"] = PAYMENT_STATUS_PAID;
      this.props.updatePaymentStatusAdvert(advert);
    }
  };

  handleAdvertGoLive = (AdvertGoLiveEvent) => {
    AdvertGoLiveEvent.preventDefault();
    let advert = this.props.advert;

    if (advert && advert.advertid !== undefined) {
      this.props.goLiveAdvert(advert.advertid);
    }
  };

  handleSaveAdvertPayment = (savePaymentEvent) => {
    savePaymentEvent.preventDefault();
    let advertpayment = this.props.advertpayment;
    const advert = this.props.advert;
    advertpayment["advertid"] = advert.advertid;

    console.log("advertpayment", JSON.stringify(advertpayment));
    if (this.props.advertpayment) {
      if (this.props.IsvalidAdvertPayment(advertpayment)) {
        if (
          advertpayment.advertpaymentid === undefined ||
          advertpayment.advertpaymentid === ""
        ) {
          console.log(
            "!advertpayment.advertpaymentid",
            !advertpayment.advertpaymentid
          );
          advertpayment["advertpaymentid"] = "new";
        }
        this.props.addAdvertPayment(advertpayment);
      }
    }
  };

  setPropertiestoAdvert = (name, value) => {
    let advert = this.props.advert;
    advert[`${name}`] = `${value}`;
    this.props.setAdvert(advert);
  };

  handleStartReview = () => {
    console.log("Handle Start Review", this.props.match.params.id);
    this.props.startReviewAdvert(this.props.match.params.id);
  };

  render() {
    const { rowClass, colClass, containerClass, paymentTypes } = {
      ...this.state,
    };
    const { loading, errors } = this.props.UI;
    const { credentials } = this.props;
    const {
      title,
      name,
      email,
      phonenumber1,
      customerRefNo,
      advertStatus,
      paymentStatus,
      advertid,
      adminComments,
    } = this.props.advert;
    const showComments =
      advertStatus === ADVERT_STATUS_INREVIEW ||
      advertStatus === ADVERT_STATUS_NEEDEDIT
        ? true
        : false;
    const showStartReview =
      advertStatus === ADVERT_STATUS_NEW || advertStatus === ADVERT_STATUS_EDIT
        ? true
        : false;
    const showPaymentDetails =
      (advertStatus === ADVERT_STATUS_INREVIEW ||
        advertStatus === ADVERT_STATUS_NEEDEDIT) &&
      (paymentStatus === PAYMENT_STATUS_NOTPAID ||
        paymentStatus === PAYMENT_STATUS_PAID)
        ? true
        : false;
    const disableAddComment =
      this.props.UI &&
      this.props.UI.errors &&
      this.props.UI.errors.adminComments
        ? true
        : false;
    const {
      notes,
      branch,
      paymentType,
      amount,
      referenceNumber,
      bank,
      advertpaymentid,
    } = this.props.advertpayment;

    const showPublishtoSite =
      (advertStatus === ADVERT_STATUS_INREVIEW &&
        paymentStatus === PAYMENT_STATUS_PAID &&
        this.props.advertpayment &&
        this.props.advertpayment.advertpaymentid !== undefined) ||
      (paymentStatus === PAYMENT_STATUS_FREE &&
        advertStatus === ADVERT_STATUS_INREVIEW)
        ? true
        : false;

    const showCompletePayment =
      advertStatus === ADVERT_STATUS_INREVIEW &&
      (paymentStatus === PAYMENT_STATUS_NOTPAID ||
        paymentStatus === PAYMENT_STATUS_MEMBERSHIP) &&
      this.props.advertpayment &&
      this.props.advertpayment.advertpaymentid !== undefined
        ? true
        : false;

    const paymentDate =
      this.props.advertpayment && this.props.advertpayment.paymentDate
        ? this.props.advertpayment.paymentDate
        : null;

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
        {/* advert details */}
        <Container className={`${containerClass}`}>
          <Table>
            <Row className={`${rowClass}`}>
              <Col xs={12} className={`${colClass}`}>
                <h4>{title}</h4>
              </Col>
              {/*   <Col>
                {` advertStatus ${advertStatus} === ADVERT_STATUS_INREVIEW ${ADVERT_STATUS_INREVIEW} ${
                  advertStatus === ADVERT_STATUS_INREVIEW
                } &&
        paymentStatus ${paymentStatus} === PAYMENT_STATUS_PAID ${PAYMENT_STATUS_PAID} ${
                  paymentStatus === PAYMENT_STATUS_PAID
                } &&
        this.props.advertpayment ${this.props.advertpayment} ${
                  this.props.advertpayment
                } && 
        this.props.advertpayment.advertpaymentid ${
          this.props.advertpayment.advertpaymentid !== undefined
        } ${this.props.advertpayment.advertpaymentid}
        ${
          (advertStatus === ADVERT_STATUS_INREVIEW &&
            paymentStatus === PAYMENT_STATUS_PAID &&
            this.props.advertpayment &&
            this.props.advertpayment.advertpaymentid) ||
          (paymentStatus === PAYMENT_STATUS_FREE &&
            advertStatus === ADVERT_STATUS_INREVIEW)
        } next argivement ${
                  paymentStatus === PAYMENT_STATUS_FREE &&
                  advertStatus === ADVERT_STATUS_INREVIEW
                }`}
              </Col>
              <Col>Hiiiiiiiiiiiiiiiiiii</Col> */}
            </Row>
            {/* <Row>
              <Col>
                {advertStatus === ADVERT_STATUS_INREVIEW &&
                  paymentStatus === PAYMENT_STATUS_PAID &&
                  this.props.advertpayment &&
                  this.props.advertpayment.advertpaymentid !== undefined}
              </Col>
            </Row> */}
            <Row className={`${rowClass}`}>
              <Col xs={12} md={2} className={`${colClass} text-md-right`}>
                Customer Name :
              </Col>
              <Col xs={12} md={2} className={`${colClass} text-md-left`}>
                {name}
              </Col>
              <Col xs={12} md={2} className={`${colClass} text-md-right`}>
                Email :
              </Col>
              <Col xs={12} md={2} className={`${colClass} text-md-left`}>
                {email}
              </Col>
              <Col xs={12} md={2} className={`${colClass} text-md-right`}>
                Phone Numner :
              </Col>
              <Col xs={12} md={2} className={`${colClass} text-md-left`}>
                {phonenumber1}
              </Col>
            </Row>
            <Row className={`${rowClass}`}>
              <Col xs={12} md={3} className={`${colClass} text-md-right `}>
                Customer Ref # :
              </Col>
              <Col xs={12} md={3} className={`${colClass} text-md-left`}>
                <Link target="_blank" to={`/ad/${advertid}`}>
                  {customerRefNo}
                </Link>
              </Col>
              <Col xs={12} md={3} className={`${colClass} text-md-right`}>
                Advert Id :
              </Col>
              <Col xs={12} md={3} className={`${colClass} text-md-left`}>
                {advertid}
              </Col>
            </Row>
            <Row className={`${rowClass}`}>
              <Col xs={12} md={3} className={`${colClass} text-md-right`}>
                Advert Status :
              </Col>
              <Col xs={12} md={3} className={`${colClass} text-md-left`}>
                {advertStatus}
              </Col>
              <Col xs={12} md={3} className={`${colClass} text-md-right`}>
                Payment Status :
              </Col>
              <Col xs={12} md={3} className={`${colClass} text-md-left`}>
                {paymentStatus}
              </Col>
            </Row>
          </Table>
        </Container>
        {/* end of advert details */}
        {/* comment section  */}
        {showComments && (
          <React.Fragment>
            <Container className={`${containerClass}`}>
              <Table>
                <Row className={`${rowClass}`}>
                  <Col xs={12} className={`${colClass}`}>
                    <h6>Review Comments</h6>
                  </Col>
                </Row>
                <Row className={`${rowClass}`}>
                  <Col xs={12} className={`${colClass}`}>
                    <InputGroup>
                      <FormControl
                        as="textarea"
                        rows="8"
                        name="adminComments"
                        value={adminComments}
                        placeholder="Comments"
                        onChange={this.handleCommentChange}
                      />
                    </InputGroup>
                    {errors && errors.adminComments && (
                      <Alert variant="danger">{`${errors.adminComments}`}</Alert>
                    )}
                  </Col>
                </Row>
                <Row className={`${rowClass}`}>
                  <Col xs={12} className={`${colClass}`}>
                    <Button
                      variant="primary"
                      onClick={this.handleSaveComments}
                      disabled={disableAddComment}
                    >
                      Request Modifications
                    </Button>
                  </Col>
                </Row>
              </Table>
            </Container>
          </React.Fragment>
        )}
        {/* end of comment section */}
        {/* payment details */}
        {showPaymentDetails && (
          <React.Fragment>
            <Container className={`${containerClass}`}>
              <Table>
                <Row className={`${rowClass}`}>
                  <Col xs={12} className={`${colClass}`}>
                    <h6>{`Payment Details ${showPaymentDetails}`}</h6>
                  </Col>
                </Row>
                <Row className={`${rowClass}`}>
                  <FormGroup as={Col} xs={12} md={4} className={`${colClass}`}>
                    <Form.Label>Payment Mode :</Form.Label>
                    <Form.Control
                      id="adreviewpaymenttype"
                      as="select"
                      name="paymentType"
                      value={paymentType}
                      className="adreviewpayment"
                      onChange={this.handlePaymentChange}
                    >
                      <option key="" value="">
                        -- Please Payment Type --
                      </option>
                      {paymentTypes.map((paymenttype) => (
                        <option key={paymenttype} value={paymenttype}>
                          {paymenttype}
                        </option>
                      ))}
                    </Form.Control>
                    {errors && errors.paymentType && (
                      <React.Fragment>
                        <Alert
                          className="m-2"
                          variant="danger"
                        >{`${errors.paymentType}`}</Alert>
                      </React.Fragment>
                    )}
                  </FormGroup>
                  <FormGroup as={Col} xs={12} md={4} className={`${colClass}`}>
                    <Form.Label>Amount (Rs.) :</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Paid Amount"
                      name="amount"
                      step="0.2"
                      value={amount}
                      onChange={this.handlePaymentChange}
                      className="adreviewpayment"
                    />
                    {errors && errors.amount && (
                      <React.Fragment>
                        <Alert
                          className="m-2"
                          variant="danger"
                        >{`${errors.amount}`}</Alert>
                      </React.Fragment>
                    )}
                  </FormGroup>
                  <FormGroup as={Col} xs={12} md={4} className={`${colClass}`}>
                    <Form.Label>Date:</Form.Label>
                    <DatePicker
                      selected={
                        paymentDate ? moment(paymentDate).toDate() : null
                      }
                      maxDate={new Date()}
                      onChange={this.handlePaymentDateChange}
                      className="searchcontrol-select"
                      popperPlacement="top-end"
                    />
                    {errors && errors.paymentDate && (
                      <React.Fragment>
                        <Alert
                          className="m-2"
                          variant="danger"
                        >{`${errors.paymentDate}`}</Alert>
                      </React.Fragment>
                    )}
                  </FormGroup>
                </Row>
                <Row className={`${rowClass}`}>
                  <FormGroup as={Col} xs={12} md={4} className={`${colClass}`}>
                    <Form.Label>Bank :</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Bank"
                      name="bank"
                      value={bank}
                      onChange={this.handlePaymentChange}
                      className="adreviewpayment"
                    />
                    {errors && errors.bank && (
                      <React.Fragment>
                        <Alert
                          className="m-2"
                          variant="danger"
                        >{`${errors.bank}`}</Alert>
                      </React.Fragment>
                    )}
                  </FormGroup>
                  <FormGroup as={Col} xs={12} md={4} className={`${colClass}`}>
                    <Form.Label>Branch :</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Branch"
                      name="branch"
                      value={branch}
                      onChange={this.handlePaymentChange}
                      className="adreviewpayment"
                    />
                    {errors && errors.branch && (
                      <React.Fragment>
                        <Alert
                          className="m-2"
                          variant="danger"
                        >{`${errors.branch}`}</Alert>
                      </React.Fragment>
                    )}
                  </FormGroup>
                  <FormGroup as={Col} xs={12} md={4} className={`${colClass}`}>
                    <Form.Label>Ref #:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ref #"
                      name="referenceNumber"
                      onChange={this.handlePaymentChange}
                      value={referenceNumber}
                      className="adreviewpayment"
                    />
                    {errors && errors.referenceNumber && (
                      <React.Fragment>
                        <Alert
                          className="m-2"
                          variant="danger"
                        >{`${errors.referenceNumber}`}</Alert>
                      </React.Fragment>
                    )}
                  </FormGroup>
                </Row>
                <Row className={`${rowClass} `}>
                  <FormGroup as={Col} xs={12} className={`${colClass}`}>
                    <Form.Label>Notes :</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="Notes"
                      onChange={this.handlePaymentChange}
                      name="notes"
                      value={notes}
                    />
                    {errors && errors.notes && (
                      <React.Fragment>
                        <Alert
                          className="m-2"
                          variant="danger"
                        >{`${errors.notes}`}</Alert>
                      </React.Fragment>
                    )}
                  </FormGroup>
                </Row>
                <Row className={`${rowClass}`}>
                  <Col xs={12} md={6} className={`${colClass}`}>
                    <Button
                      variant="primary"
                      onClick={this.handleSaveAdvertPayment}
                    >
                      Save Payment Details
                    </Button>
                  </Col>
                  <Col xs={12} md={6} className={`${colClass}`}>
                    <Button
                      variant="primary"
                      onClick={this.handleUpdatePaymentStatus}
                      disabled={!showCompletePayment}
                    >
                      Payment is Complete
                    </Button>
                  </Col>
                </Row>
              </Table>
            </Container>
          </React.Fragment>
        )}

        {/* end of payment details */}
        {/* action buttons */}
        <Container className={`${containerClass}`}>
          <Table>
            <Row className={`${rowClass}`}>
              <Col xs={12} className={`${colClass} text-center`}>
                {showStartReview && (
                  <Button variant="primary" onClick={this.handleStartReview}>
                    Start Review
                  </Button>
                )}
                {showPublishtoSite && (
                  <Button variant="primary" onClick={this.handleAdvertGoLive}>
                    Publish Advert Live
                  </Button>
                )}
              </Col>
            </Row>
          </Table>
        </Container>
        {/* end of action buttons */}
      </React.Fragment>
    );
  }
}

AdReview.propTypes = {
  startReviewAdvert: PropTypes.func.isRequired,
  validateAdvertReviewComment: PropTypes.func.isRequired,
  IsvalidAdvertReviewComment: PropTypes.func.isRequired,
  setAdvert: PropTypes.func.isRequired,
  setAdvertPayment: PropTypes.func.isRequired,
  commentReviewAdvert: PropTypes.func.isRequired,
  validateAdvertProperty: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  advert: PropTypes.object.isRequired,
  ad: PropTypes.object.isRequired,
  advertpayment: PropTypes.object.isRequired,
  getPreloadDataforAdvertReview: PropTypes.func.isRequired,
  IsvalidAdvertPayment: PropTypes.func.isRequired,
  addAdvertPayment: PropTypes.func.isRequired,
  goLiveAdvert: PropTypes.func.isRequired,
  updatePaymentStatusAdvert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI,
  ad: state.ad,
  advert: state.ad.advert,
  advertpayment: state.ad.advertpayment,
});

const mapActionsToProps = {
  startReviewAdvert,
  validateAdvertReviewComment,
  setAdvert,
  commentReviewAdvert,
  IsvalidAdvertReviewComment,
  setAdvertPayment,
  validateAdvertProperty,
  getPreloadDataforAdvertReview,
  IsvalidAdvertPayment,
  addAdvertPayment,
  goLiveAdvert,
  updatePaymentStatusAdvert,
};

export default connect(mapStateToProps, mapActionsToProps)(AdReview);
