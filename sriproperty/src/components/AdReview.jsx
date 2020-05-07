import React, { Component } from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import {
  getAdvertbyId,
  startReviewAdvert,
  validateAdvertReviewComment,
  setAdvert,
  commentReviewAdvert,
  IsvalidAdvertReviewComment,
  getAdvertPaymentbyAdvertId,
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
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { errors } from "joi-browser";
import {
  ADVERT_STATUS_INREVIEW,
  ADVERT_STATUS_NEEDEDIT,
  ADVERT_STATUS_LIVE,
  ADVERT_STATUS_NEW,
  ADVERT_STATUS_EDIT,
  ADVERT_STATUS_EXPIRED,
  PAYMENT_STATUS_PAID,
  PAYMENT_STATUS_NOTPAID,
} from "../redux/types";
export class AdReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowClass: "mx-auto d-flex text-xs-center",
      colClass: "p-2 flex-fill text-xs-center",
      containerClass: "mx-auto my-3 p-2 adminlist-search-container",
      paymentTypes: ["Cash", "Online", "Bank Deposit"],
      paymentDate:
        this.props &&
        this.props.advertpayment &&
        this.props.advertpayment.paymentDate
          ? this.props.advertpayment.paymentDate
          : new Date(),
    };
  }

  componentDidMount = () => {
    const advert = { advertid: this.props.match.params.id };
    if (advert.advertid) {
      this.props.getAdvertbyId(advert);
      this.props.getAdvertPaymentbyAdvertId(advert.advertid);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.props.UI.errors };
    this.props.validateAdvertReviewComment(name, value, errors);
    this.setPropertiestoAdvert(name, value);
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

  setPropertiestoAdvert = (name, value) => {
    let advert = this.props.advert;
    advert[`${name}`] = `${value}`;
    this.props.setAdvert(advert);
  };

  handleStartReview = () => {
    console.log("Handle Start Review", this.props.match.params.id);
    this.props.startReviewAdvert(this.props.match.params.id);
  };

  handleFromDateChange = (date) => {
    this.setState({
      paymentDate: date,
    });
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
    } = this.props.advertpayment;

    return (
      <React.Fragment>
        {/* advert details */}
        <Container className={`${containerClass}`}>
          <Table>
            <Row className={`${rowClass}`}>
              <Col xs={12} className={`${colClass}`}>
                <h4>{title}</h4>
              </Col>
            </Row>
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
                        onChange={this.handleChange}
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
                  </FormGroup>
                  <FormGroup as={Col} xs={12} md={4} className={`${colClass}`}>
                    <Form.Label>Amount (Rs.) :</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Paid Amount"
                      name="amount"
                      step="0.2"
                      value={amount}
                      className="adreviewpayment"
                    />
                  </FormGroup>
                  <FormGroup as={Col} xs={12} md={4} className={`${colClass}`}>
                    <Form.Label>Date:</Form.Label>
                    <DatePicker
                      name="paymentDate"
                      selected={this.state.paymentDate}
                      onChange={this.handleFromDateChange}
                      className="searchcontrol-select form-control react-datepicker-wrapper"
                    />
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
                      className="adreviewpayment"
                    />
                  </FormGroup>
                  <FormGroup as={Col} xs={12} md={4} className={`${colClass}`}>
                    <Form.Label>Branch :</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Branch"
                      name="branch"
                      value={branch}
                      className="adreviewpayment"
                    />
                  </FormGroup>
                  <FormGroup as={Col} xs={12} md={4} className={`${colClass}`}>
                    <Form.Label>Ref #:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ref #"
                      name="referenceNumber"
                      value={referenceNumber}
                      className="adreviewpayment"
                    />
                  </FormGroup>
                </Row>
                <Row className={`${rowClass} `}>
                  <FormGroup as={Col} xs={12} className={`${colClass}`}>
                    <Form.Label>Notes :</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="Notes"
                      name="notes"
                      value={notes}
                    />
                  </FormGroup>
                </Row>
                <Row className={`${rowClass}`}>
                  <Col xs={12} className={`${colClass}`}>
                    <Button>Save Payment Details</Button>
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
                {!showStartReview && <Button>Publish</Button>}
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
  getAdvertbyId: PropTypes.func.isRequired,
  startReviewAdvert: PropTypes.func.isRequired,
  validateAdvertReviewComment: PropTypes.func.isRequired,
  IsvalidAdvertReviewComment: PropTypes.func.isRequired,
  getAdvertPaymentbyAdvertId: PropTypes.func.isRequired,
  setAdvert: PropTypes.func.isRequired,
  commentReviewAdvert: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  advert: PropTypes.object.isRequired,
  ad: PropTypes.object.isRequired,
  advertpayment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI,
  ad: state.ad,
  advert: state.ad.advert,
  advertpayment: state.ad.advertpayment,
});

const mapActionsToProps = {
  getAdvertbyId,
  startReviewAdvert,
  validateAdvertReviewComment,
  setAdvert,
  commentReviewAdvert,
  IsvalidAdvertReviewComment,
  getAdvertPaymentbyAdvertId,
};

export default connect(mapStateToProps, mapActionsToProps)(AdReview);
