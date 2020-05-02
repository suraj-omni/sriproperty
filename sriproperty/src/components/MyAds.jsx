import React, { Component, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAdvertsbyUserId,
  setAdvert,
  deleteAdvert,
  resetAdverts,
} from "../redux/actions/adActions";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TabContainer from "react-bootstrap/TabContainer";
const MyAdsTable = lazy(() => import("./MyAdsTable"));

export class MyAds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colpadding: "p-2",
      errors: {},
      tabkey: "myads",
      count: 0,
    };
  }

  componentWillMount = () => {
    const advert = {};
    this.props.setAdvert(advert);
    this.props.getAdvertsbyUserId();
  };
  componentDidMount = () => {
    /*     const [adverts] = [this.props.adverts];
    const count = adverts.length ? adverts.length : 0;
    console.log("count", count);
    this.setState({ count }); */
  };

  handleDelete = (advertid, index) => {
    let adverts = this.props.adverts;
    this.props.deleteAdvert(advertid);
    adverts.splice(index, 1);
    this.props.resetAdverts(adverts);
  };

  setTabkey = (tabkey) => {
    if (tabkey === "profile") {
      this.props.history.push("/updateprofile");
    }
  };

  render() {
    const adverts = [this.props.adverts];
    const count = this.props.ad.advertscount;
    const { loading } = this.props.UI;
    return (
      <React.Fragment>
        <Container className="register-font p-1">
          <Tabs
            id="myadstabs"
            activeKey={this.state.tabkey}
            onSelect={this.setTabkey}
          >
            <Tab eventKey="profile" title="My Account Details">
              <TabContainer></TabContainer>
            </Tab>
            <Tab eventKey="myads" title="My Ads">
              <TabContainer>
                <Table>
                  <Row className="align-center m-3">
                    <Col className="h4">My Ads</Col>
                  </Row>
                  <Row className="align-center m-3">
                    <Col>
                      <Suspense
                        fallback={
                          <div className="loader mx-auto">Loading ...</div>
                        }
                      >
                        <MyAdsTable
                          props={this.props}
                          adverts={adverts}
                          loading={loading}
                          handleDelete={this.handleDelete}
                          count={count}
                        />
                      </Suspense>
                    </Col>
                  </Row>
                </Table>
              </TabContainer>
            </Tab>
          </Tabs>
        </Container>
      </React.Fragment>
    );
  }
}

MyAds.propTypes = {
  getAdvertsbyUserId: PropTypes.func.isRequired,
  setAdvert: PropTypes.func.isRequired,
  resetAdverts: PropTypes.func.isRequired,
  deleteAdvert: PropTypes.func.isRequired,
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
  getAdvertsbyUserId,
  setAdvert,
  deleteAdvert,
  resetAdverts,
};

export default connect(mapStateToProps, mapActionsToProps)(MyAds);
