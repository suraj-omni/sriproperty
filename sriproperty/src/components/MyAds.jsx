import React, { Component, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAdvertsbyUserId } from "../redux/actions/adActions";
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
      adverts: [],
      errors: {},
      tabkey: "myads",
    };
  }
  componentDidMount = () => {
    this.props.getAdvertsbyUserId();
  };

  setTabkey = (tabkey) => {
    if (tabkey === "profile") {
      this.props.history.push("/updateprofile");
    }
  };

  render() {
    const adverts = [...this.props.adverts];
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
};

export default connect(mapStateToProps, mapActionsToProps)(MyAds);
