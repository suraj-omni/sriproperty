import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAdvertbyId } from "../redux/actions/adActions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Link from "react-router-dom/Link";

import AdViewMain from "./AdViewMain";
import Button from "react-bootstrap/Button";

class AdView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advert: {},
    };
  }

  componentDidMount = () => {
    const advert = { advertid: this.props.match.params.id };
    //console.log("componentDidMount", advert);
    if (advert.advertid) {
      this.props.getAdvertbyId(advert);
    }
  };

  render() {
    const { loading } = this.props.UI;
    const { credentials, history } = this.props;
    const advert = this.props.advert;
    return (
      <React.Fragment>
        <Container>
          <Row className="">
            <Col id="adviewcol1" className="" lg={2} md={2} sm={0}>
              <Card>
                <Card.Img
                  className="advert-logo mx-auto"
                  variant="top"
                  src="https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/ads%2Fg21%20-%20Copy.png?alt=media&token=894f17dc-dee3-47d0-bb3f-4e08e74d750d"
                />
                <Card.Img
                  variant="top"
                  src="https://firebasestorage.googleapis.com/v0/b/sriproperty-b397e.appspot.com/o/ads%2FRemax%20-%20iPh%2011Pro%20XXS%20-%20Emperor%20Series%209D%20Tempered%20Glass%20-%20Designed%20for%205.8.png?alt=media&token=2602a1f7-9c3a-4333-883e-2b9ff3c3dd43"
                />
                <Card.Body>
                  <Card.Title>
                    <h6>
                      Remax - iPh 11Pro /X/XS - Emperor Series 9D Tempered Glass
                      - Designed for 5.8"
                    </h6>
                  </Card.Title>
                  <Card.Text>
                    <a
                      href="https://ebuy.lk/collections/screen-protectors/products/remax-iph-11pro-x-xs-emperor-series-9d-tempered-glass-design-for-6-5"
                      target="_blank"
                      rel="noopener"
                    >
                      <Button size="sm" variant="dark">
                        Shop Now
                      </Button>
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img
                  className="advert-logo mx-auto"
                  variant="top"
                  src="https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/ads%2Fg21%20-%20Copy.png?alt=media&token=894f17dc-dee3-47d0-bb3f-4e08e74d750d"
                />
                <Card.Img
                  variant="top"
                  src="https://firebasestorage.googleapis.com/v0/b/sriproperty-b397e.appspot.com/o/ads%2FZENDURE%20-%20Passport%2030W%20Global%20Travel%20Adapter.webp?alt=media&token=68ec1551-e758-4a1a-9cfc-80771f8a425c"
                />
                <Card.Body>
                  <Card.Title>
                    ZENDURE - Passport 30W Global Travel Adapter - Black
                  </Card.Title>
                  <Card.Text>
                    <a
                      href="https://ebuy.lk/collections/chargers/products/zendure-passport-30w-global-travel-adapter-black"
                      target="_blank"
                      rel="noopener"
                    >
                      <Button size="sm" variant="dark">
                        Shop Now
                      </Button>
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col id="adviewcol2" className="" lg={8} sm={12} md={9}>
              {!loading && (
                <AdViewMain
                  history={history}
                  loading={loading}
                  advert={advert}
                  credentials={credentials}
                />
              )}
            </Col>
            <Col id="adviewcol3" className="" lg={2} md={3} sm={0}>
              <Card>
                <Card.Img
                  className="advert-logo mx-auto"
                  variant="top"
                  src="https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/ads%2Fg21%20-%20Copy.png?alt=media&token=894f17dc-dee3-47d0-bb3f-4e08e74d750d"
                />
                <Card.Img
                  variant="top"
                  src="https://firebasestorage.googleapis.com/v0/b/sriproperty-b397e.appspot.com/o/ads%2FFitbit%20-%20Versa%20-%20Special%20Edition.webp?alt=media&token=803a4a1a-63d8-42a5-b194-f9166da1ec7d"
                />
                <Card.Body>
                  <Card.Title>Fitbit - Versa - Special Edition</Card.Title>
                  <Card.Text>
                    <a
                      href="https://ebuy.lk/collections/smart-watches/products/fitbit-versa-special-edition"
                      target="_blank"
                      rel="noopener"
                    >
                      <Button size="sm" variant="dark">
                        Shop Now
                      </Button>
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img
                  className="advert-logo mx-auto"
                  variant="top"
                  src="https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/ads%2Fg21%20-%20Copy.png?alt=media&token=894f17dc-dee3-47d0-bb3f-4e08e74d750d"
                />
                <Card.Img
                  variant="top"
                  src="https://firebasestorage.googleapis.com/v0/b/sriproperty-b397e.appspot.com/o/ads%2FANKER%20-%20SOUNDCORE%20-%20LIBERTY%20AIR.webp?alt=media&token=aa2cba29-85cf-4deb-a5d2-2fcc96e37642"
                />
                <Card.Body>
                  <Card.Title>ANKER - SOUNDCORE - LIBERTY AIR</Card.Title>
                  <Card.Text>
                    <a
                      href="https://ebuy.lk/collections/earbuds/products/anker-soundcore-liberty-air"
                      target="_blank"
                      rel="noopener"
                    >
                      <Button size="sm" variant="dark">
                        Shop Now
                      </Button>
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
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
