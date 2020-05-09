import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAdvertbyId } from "../redux/actions/adActions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import AdViewMain from "./AdViewMain";

class AdView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advert: {},
    };
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
    const advert = this.props.advert;
    return (
      <React.Fragment>
        <Container>
          <Row className="">
            <Col id="adviewcol1" className="" md={2} sm={0}>
              AAAA
            </Col>
            <Col id="adviewcol2" className="" sm={12} md={8}>
              <AdViewMain
                loading={loading}
                advert={advert}
                credentials={credentials}
              />
            </Col>
            <Col id="adviewcol3" className="" lg={2} md={4} sm={0}>
              CCC
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

AdView.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(AdView);
