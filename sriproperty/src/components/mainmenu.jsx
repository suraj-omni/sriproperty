import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { Route, Switch, withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import config from "../util/config";
import Select from "react-select";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ClearAllSearch } from "../redux/actions/searchActions";
import { logOutUser } from "../redux/actions/userActions";

class MainMenu extends Component {
  state = {
    navlinkclass: "mx-1 nav-link",
    showmodal: false,
    category: "",
    district: "",
    adtype: "",
  };

  handlePostAd = (event) => {
    this.props.history.push("/postad");
  };

  handleLogout = () => {
    this.props.logOutUser(this.props.history);
  };

  handleModalClose = () => {
    this.setState({ showmodal: false });
  };

  handleSearch = () => {
    if (!this.state.category || !this.state.district) {
      alert("Please select a District and a Category!!!");
      return null;
    } else {
      this.setState({ showmodal: false });
      //this.props.ClearAllSearch();
      this.props.history.push(
        `/search/${this.state.district}/${this.state.category}/${this.state.adtype}`
      );
      window.location.reload(false);
    }
  };

  render_LocationModal = () => {
    const districtslist = config.districtsoptionslist;
    return (
      <React.Fragment>
        <Modal
          show={this.state.showmodal}
          onHide={this.handleModalClose}
          centered
          className="main_menu_district_modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Select the District</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Select
              id="districtdropdown"
              name="districtdropdown"
              options={districtslist}
              isSearchable="true"
              classNamePrefix="searchloc"
              className="dropdownwidthsearchbox_searchbox"
              onChange={(e) => {
                this.setState({ district: e.value });
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSearch}>
              View Properties
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  };

  render() {
    const { authenticated, isAdmin, history } = this.props;
    return (
      <React.Fragment>
        <Container className="p-2 mx-auto">
          <Navbar bg="light" className="main-menu" expand="md">
            <Navbar.Brand href="/">
              <Image
                src="/img/fbprofilepicture.png"
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
                  <NavDropdown.Item
                    href="#action/3.2"
                    onClick={() => {
                      this.setState({
                        showmodal: true,
                        category: "Land",
                        adtype: "sell",
                      });
                    }}
                  >
                    Land
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      this.setState({
                        showmodal: true,
                        category: "House",
                        adtype: "sell",
                      });
                    }}
                  >
                    House
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      this.setState({
                        showmodal: true,
                        category: "Apartment",
                        adtype: "sell",
                      });
                    }}
                  >
                    Apartment
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      this.setState({
                        showmodal: true,
                        category: "Commercial Property",
                        adtype: "sell",
                      });
                    }}
                  >
                    Commercial Property
                  </NavDropdown.Item>
                </NavDropdown>
                {/* Rentals */}
                <NavDropdown
                  title="Rentals"
                  id="basic-nav-dropdown"
                  className={this.state.navlinkclass}
                >
                  <NavDropdown.Item
                    onClick={() => {
                      this.setState({
                        showmodal: true,
                        category: "House",
                        adtype: "rent",
                      });
                    }}
                  >
                    House
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      this.setState({
                        showmodal: true,
                        category: "Apartment",
                        adtype: "rent",
                      });
                    }}
                  >
                    Apartment
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      this.setState({
                        showmodal: true,
                        category: "Room or Annex",
                        adtype: "rent",
                      });
                    }}
                  >
                    Room or Annex
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      this.setState({
                        showmodal: true,
                        category: "Holiday and Short Rental",
                        adtype: "rent",
                      });
                    }}
                  >
                    Holiday and Short Rental
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      this.setState({
                        showmodal: true,
                        category: "Commercial Property",
                        adtype: "rent",
                      });
                    }}
                  >
                    Commercial Property
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() => {
                      this.setState({
                        showmodal: true,
                        category: "Land",
                        adtype: "rent",
                      });
                    }}
                  >
                    Land
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
              {!isAdmin && (
                <React.Fragment>
                  <Link id="postad" to="/postad" className="text-white">
                    <Button
                      id="btnpostad"
                      variant="primary"
                      size="sm"
                      type="submit"
                    >
                      Post Your Ad
                    </Button>
                  </Link>
                </React.Fragment>
              )}
            </div>
          </Navbar>
          {this.render_LocationModal()}
        </Container>
      </React.Fragment>
    );
  }
}

MainMenu.propTypes = {
  ClearAllSearch: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  isAdmin: state.user.credentials.isAdmin,
  search: state.search,
});

const mapActionsToProps = {
  logOutUser,
  ClearAllSearch,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(MainMenu));
