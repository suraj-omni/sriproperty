import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAdvertbyId } from "../redux/actions/adActions";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export class AdReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const advert = { advertid: this.props.match.params.id };
    if (advert.advertid) {
      this.props.getAdvertbyId(advert);
    }
  };

  render() {
    const { loading } = this.props.UI;
    const { credentials } = this.props;
    const {
      name,
      email,
      phonenumber1,
      customerRefNo,
      advertStatus,
      paymentStatus,
      advertid,
    } = this.props.advert;
    return (
      <React.Fragment>
        <Container className="mx-auto my-3 p-2 adminlist-search-container">
          <Table>
            <Row>
              <Col>Customer Ref #</Col>
              <Col>{customerRefNo}</Col>
              <Col>Advert Id</Col>
              <Col>{advertid}</Col>
            </Row>
            <Row>
              <Col>Advert Status</Col>
              <Col>{advertStatus}</Col>
              <Col>Payment Status</Col>
              <Col>{paymentStatus}</Col>
            </Row>

            <Row>
              <Col>Customer Name</Col>
              <Col>{name}</Col>
              <Col>Email</Col>
              <Col>{email}</Col>
              <Col>Phone Numner</Col>
              <Col>{phonenumber1}</Col>
            </Row>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

AdReview.propTypes = {
  getAdvertbyId: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  advert: PropTypes.object.isRequired,
  ad: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI,
  ad: state.ad,
  advert: state.ad.advert,
});

const mapActionsToProps = {
  getAdvertbyId,
};

export default connect(mapStateToProps, mapActionsToProps)(AdReview);
