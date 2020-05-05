import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOutUser } from "../redux/actions/userActions";
import { Route, Switch, withRouter } from "react-router-dom";
class MainMenu extends Component {
  state = {
    navlinkclass: "mx-1 nav-link",
  };

  handlePostAd = (event) => {
    this.props.history.push("/postad");
  };

  handleLogout = () => {
    this.props.logOutUser(this.props.history);
  };

  render() {
    const { authenticated, isAdmin, history } = this.props;
    return (
      <React.Fragment>
        <Container>
          <Navbar bg="light" expand="md">
            <Navbar.Brand href="#home">
              <Image
                src="../../img/fbprofilepicture.png"
                width="100"
                height="100"
                roundedCircle
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to="/" className={this.state.navlinkclass}>
                  Home
                </Link>
                <NavDropdown
                  title="Sales"
                  id="salesdropdown"
                  className={this.state.navlinkclass}
                >
                  <NavDropdown.Item href="#action/3.1">Houses</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Apartments
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Commercial
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Bungalows
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Villas</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Studio / Bedsit
                  </NavDropdown.Item>
                </NavDropdown>
                {/* Rentals */}
                <NavDropdown
                  title="Rentals"
                  id="basic-nav-dropdown"
                  className={this.state.navlinkclass}
                >
                  <NavDropdown.Item href="#action/3.1">Houses</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Apartments
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Commercial
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Bungalows
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Villas</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Studio / Bedsit
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Rooms</NavDropdown.Item>
                </NavDropdown>
                {/* Lands */}
                <NavDropdown
                  title="Land"
                  id="basic-nav-dropdown"
                  className={this.state.navlinkclass}
                >
                  <NavDropdown.Item href="#action/3.1">Houses</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Bare Land
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Beachfront Land
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Cultivated / Agriculture
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Land with House
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Tea Estate
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Rubber Estate
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Coconut Estate
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Paddy Land
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Cinnamon Estate
                  </NavDropdown.Item>
                </NavDropdown>
                {authenticated & !isAdmin ? (
                  <React.Fragment>
                    <Link
                      to="/updateprofile"
                      className={this.state.navlinkclass}
                    >
                      My Account
                    </Link>
                    <Link
                      hidden
                      id="linkpostad"
                      to="/postad"
                      className={this.state.navlinkclass}
                    >
                      Post Your Ad
                    </Link>
                    <Link
                      to="/"
                      onClick={this.handleLogout}
                      className={this.state.navlinkclass}
                    >
                      Logout
                    </Link>
                  </React.Fragment>
                ) : authenticated & isAdmin ? (
                  <React.Fragment>
                    <div className="mx-1 nav-link dropdown nav-item">
                      <Link to="/admin" className={this.state.navlinkclass}>
                        Admin
                      </Link>
                    </div>
                    <div className="logoutdiv my-auto">
                      <Link
                        to="/"
                        onClick={this.handleLogout}
                        className={this.state.navlinkclass}
                      >
                        Logout
                      </Link>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link to="/login" className={this.state.navlinkclass}>
                      Login
                    </Link>
                    <Link to="/register" className={this.state.navlinkclass}>
                      Register
                    </Link>
                  </React.Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
            <div id="mainmenupostadbtn">
              {authenticated && !isAdmin && (
                <React.Fragment>
                  <Button
                    id="btnpostad"
                    variant="primary"
                    size="sm"
                    type="submit"
                  >
                    <Link id="postad" to="/postad" className="text-white">
                      Post Your Ad
                    </Link>
                  </Button>
                </React.Fragment>
              )}
            </div>
          </Navbar>
        </Container>
      </React.Fragment>
    );
  }
}

MainMenu.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  isAdmin: state.user.credentials.isAdmin,
});

const mapActionsToProps = {
  logOutUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(MainMenu));
