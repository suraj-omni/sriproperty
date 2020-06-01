import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TabContainer from "react-bootstrap/TabContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import EditProfile from "./editprofile";

import { connect } from "react-redux";
import {
  logOutUser,
  uploadImage,
  sendResetPasswordEmail,
  editUserDetails,
} from "../redux/actions/userActions";

class updateprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowpadding: "p-1",
      navlinkclass: "nav-link",
      disablebutton: false,
      tabkey: "profile",
    };
  }

  setTabkey = (tabkey) => {
    if (tabkey === "myads") {
      this.props.history.push("/myads");
    }
  };

  handleChange = (event) => {
    // this.props.user.credentials.name = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    //send to server
    if (image) {
      const formdata = new FormData();
      formdata.append("image", image, image.name);
      this.props.uploadImage(formdata);
    }
  };

  handleEditPicture = () => {
    const fileinput = document.getElementById("profileimageinput");
    fileinput.click();
  };

  handleResetPassword = () => {
    this.props.sendResetPasswordEmail();
  };

  handleLogout = () => {
    this.props.logOutUser(this.props.history);
  };

  render() {
    const {
      user: {
        credentials: { email, phonenumber, imageUrl, phonenumberconfirmed },
      },
    } = this.props;

    const {
      UI: { loadingresetemail, msgs, disablebutton, loadinguploeaduserimage },
    } = this.props;

    return (
      <React.Fragment>
        <Container className="register-font">
          <Tabs id="controlled-tab-example" onSelect={this.setTabkey}>
            <Tab eventKey="home" title="My Account Details">
              <TabContainer className="pb-3  mb-2">
                <Row className="generic-border userprofile-background mx-auto p-0">
                  <Col>
                    {/* user details */}
                    <Row className="align-center m-3">
                      <Col className="h4">My Account Details</Col>
                    </Row>
                    {/* profile picture */}
                    <Row className="userprofilesectionwarapper userprofile-container  my-2 mx-auto generic-border">
                      <Col>
                        <Row className={this.state.rowpadding}>
                          <Col className="text-center font-weight-bold">
                            <Image
                              className="profileiamge"
                              src={imageUrl}
                              roundedCircle
                            />
                          </Col>
                        </Row>
                        <Row className={this.state.rowpadding}>
                          <Col>
                            <Button
                              variant="primary"
                              className="uploadimagebutton"
                              type="submit"
                              onClick={this.handleEditPicture}
                              disabled={loadinguploeaduserimage}
                            >
                              {loadinguploeaduserimage && (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  visible="false"
                                ></Spinner>
                              )}
                              {!loadinguploeaduserimage && (
                                <FontAwesomeIcon
                                  style={{ color: "#6DB65B" }}
                                  icon={faUserEdit}
                                  size="2x"
                                  title="click here to upload new profile picture."
                                />
                              )}
                            </Button>

                            <input
                              type="file"
                              id="profileimageinput"
                              onChange={this.handleImageChange}
                              hidden="hidden"
                            ></input>
                          </Col>
                        </Row>
                        <Row className={this.state.rowpadding}>
                          <Col className="text-info">
                            Click the icon to change the profile picture
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {/* end of profile picture */}
                    <Row className="userprofilesectionwarapper userprofile-container  my-2 mx-auto generic-border">
                      <Col className="text-center">
                        <EditProfile />
                      </Col>
                    </Row>
                    {/* end of user details */}
                    {/* change password */}
                    <Row className="userprofilesectionwarapper userprofile-container  my-2 mx-auto generic-border">
                      <Col>
                        <Row className={this.state.rowpadding}>
                          <Col xs={12} className="text-center font-weight-bold">
                            Email
                          </Col>

                          <Col xs={12} className="text-center">
                            <span>{email}</span>
                          </Col>
                        </Row>

                        <Row className={this.state.rowpadding}>
                          <Col>
                            <Button
                              variant="primary"
                              type="submit"
                              className="btn-sm"
                              onClick={this.handleResetPassword}
                              disabled={disablebutton}
                            >
                              Send me reset password email
                              {loadingresetemail && (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  visible="false"
                                ></Spinner>
                              )}
                            </Button>
                            <Col xs={12} className="text-center text-info my-2">
                              In order to reset password. please click on the
                              button to receive an email with reset passwork
                              link.
                              {msgs &&
                                msgs.messege &&
                                msgs.messege.passwordreset && (
                                  <div className="loginerrorlabels">
                                    {msgs.messege.passwordreset}
                                  </div>
                                )}
                            </Col>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {/* end of change password */}
                    <Row
                      className="userprofilesectionwarapper
                      my-2
                      mx-auto generic-border userprofile-container"
                    >
                      <Col>
                        <Row className={this.state.rowpadding}>
                          <Col xs={12} className="text-center font-weight-bold">
                            Phone Number
                          </Col>
                          <Col xs={12} className="text-sm-center">
                            <Row>
                              <Col
                                xs={12}
                                className={`text-center ${phonenumber}  ${
                                  !phonenumberconfirmed
                                    ? "text-danger"
                                    : "text-info"
                                }
                                 `}
                              >
                                <span
                                  className={`${this.state.rowpadding} text-center text-blue`}
                                >{`${phonenumber}  ${
                                  phonenumberconfirmed
                                    ? " - confirmed"
                                    : " - not confirmed"
                                }
                                 `}</span>
                              </Col>
                              <Col
                                xs={12}
                                className={`${this.state.rowpadding} text-center`}
                              >
                                <Button
                                  variant="primary"
                                  type="submit"
                                  className="btn-sm"
                                  disabled={phonenumberconfirmed}
                                >
                                  Confirm Phone Number
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {/* log out */}
                    <Row className={this.state.rowpadding}>
                      <Col>
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={this.handleLogout}
                        >
                          Log out
                        </Button>
                      </Col>
                    </Row>
                    {/* end of log out */}
                  </Col>
                </Row>
              </TabContainer>
            </Tab>
            <Tab eventKey="myads" title="My Ads">
              <TabContainer></TabContainer>
            </Tab>
          </Tabs>
        </Container>
      </React.Fragment>
    );
  }
}

updateprofile.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
  editUserDetails: PropTypes.func.isRequired,
  sendResetPasswordEmail: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  uploadImage,
  logOutUser,
  sendResetPasswordEmail,
  editUserDetails,
};

export default connect(mapStateToProps, mapActionsToProps)(updateprofile);
