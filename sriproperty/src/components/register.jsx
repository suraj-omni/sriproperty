import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
//redux stuff
import { connect } from "react-redux";
import { signupuser } from "../redux/actions/userActions";

import { firebase } from "../init-firebase";

const analytics = firebase.analytics();

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textboxclass: "p-2",
      navlinkclass: "nav-link",
      email: "",
      password: "",
      confirmpassword: "",
      name: "",
      phonenumber: "",
      // loading: false,
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      // console.log("nextProps.UI.errors", nextProps.UI.errors);
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: {} });
    const signupUsereData = {
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword,
      phonenumber: this.state.phonenumber,
      name: this.state.name,
    };

    this.props.signupuser(signupUsereData, this.props.history);
    analytics.logEvent("signedup");
  };

  render() {
    const { errors } = this.state;
    const {
      UI: { loading },
    } = this.props;

    return (
      <React.Fragment>
        <Container className="register-font p-1 login-register-container generic-border">
          <Row className="p-2" lg={10}>
            <Col>
              <h4>Sign up with Sri Property</h4>
            </Col>
          </Row>
          <Row className="p-2" lg={10}>
            <Col>
              To register all you have to do is complete the details below.
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} className="register-box-border">
              <Row>
                <Col>
                  <Container className="p-2">
                    <Row className="p-1">
                      <Col className="align-items-center text-right">
                        <Image
                          className="register-image-ad"
                          src="../img/posting-icon-15.jpg"
                          roundedCircle
                          fluid
                        />
                      </Col>
                      <Col className="d-flex align-items-center text-left">
                        Start posting your own ads.
                      </Col>
                    </Row>
                    <Row className="p-1">
                      <Col className="align-items-center text-right">
                        <Image
                          className="register-image-ad"
                          src="../img/advertisement-icon.jpg"
                          roundedCircle
                          fluid
                        />
                      </Col>
                      <Col className="d-flex align-items-center text-left">
                        Registration and posting 2 ad's are completely free.
                      </Col>
                    </Row>
                    <Row className="p-1">
                      <Col className="align-items-center text-right">
                        <Image
                          className="register-image-ad"
                          src="../img/manage-ad.png"
                          roundedCircle
                          fluid
                        />
                      </Col>
                      <Col className="d-flex align-items-center text-left">
                        View and manage your ads at your convenience.
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} className="">
              <Form onSubmit={this.handleSubmit}>
                <Row className={this.state.textboxclass}>
                  <Col>
                    {errors && errors.general && (
                      <span className="loginerrorlabels">{errors.general}</span>
                    )}
                  </Col>
                </Row>
                <Row className={this.state.textboxclass}>
                  <Col>
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter full name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                    {errors && errors.name && (
                      <div className="loginerrorlabels">{errors.name}</div>
                    )}
                  </Col>
                </Row>
                <Row className={this.state.textboxclass}>
                  <Col>
                    <Form.Control
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    {errors && errors.email && (
                      <div className="loginerrorlabels">{errors.email}</div>
                    )}
                  </Col>
                </Row>
                <Row className={this.state.textboxclass}>
                  <Col>
                    <Form.Control
                      type="text"
                      name="phonenumber"
                      id="phonenumber"
                      placeholder="Enter mobile phone number"
                      value={this.state.phonenumber}
                      onChange={this.handleChange}
                    />
                    {errors && errors.phonenumber && (
                      <div className="loginerrorlabels">
                        {errors.phonenumber}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className={this.state.textboxclass}>
                  <Col>
                    <Form.Control
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />

                    {errors && errors.password && (
                      <div className="loginerrorlabels">{errors.password}</div>
                    )}
                  </Col>
                </Row>
                <Row className={this.state.textboxclass}>
                  <Col>
                    <Form.Control
                      type="password"
                      name="confirmpassword"
                      id="confirmpassword"
                      placeholder="Confirm password"
                      value={this.state.confirmpassword}
                      onChange={this.handleChange}
                    />

                    {errors && errors.confirmpassword && (
                      <div className="loginerrorlabels">
                        {errors.confirmpassword}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className={this.state.textboxclass}>
                  <Col>
                    <Button variant="primary" type="submit">
                      {loading && (
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          visible="false"
                        ></Spinner>
                      )}
                      Register
                    </Button>
                  </Col>
                </Row>
                <Row className={this.state.textboxclass}>
                  <Col lg={6} className="align-items-center p-1">
                    Already registered?
                  </Col>
                  <Col lg={6} className="align-items-center p-1">
                    <Link to="/login" className={this.state.navlinkclass}>
                      Click here to Login
                    </Link>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  signupuser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  signupuser,
};

export default connect(mapStateToProps, mapActionsToProps)(Register);
