import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

class SPFooter extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Container className="mt-3 mb-0">
          <Row className="mx-auto mb-0">
            <Col xs={12} md={4} className="">
              <div>
                <h4>sriproperty.lk</h4>
              </div>
              <p></p>
              <ul className="list-unstyled">
                <li class="item-list-a">
                  <Link to="/contactus" className="nav-link">
                    Contact Us
                  </Link>
                </li>
                <li class="item-list-a">
                  <Link to="/aboutus" className="nav-link">
                    About Us
                  </Link>
                </li>
                <li class="item-list-a">
                  <Link to="/termsandconditions" className="nav-link">
                    Terms and Conditions
                  </Link>
                </li>
                <li class="item-list-a">
                  <Link to="/privacypolicy" className="nav-link">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </Col>
            <Col xs={12} md={4} className="">
              <div>
                <h4>Navigation</h4>
              </div>
              <p></p>
              <ul class="list-unstyled">
                <li class="item-list-a">
                  <Link to="/postad" className="nav-link">
                    Post your ad
                  </Link>
                </li>
                <li class="item-list-a">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li class="item-list-a">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            </Col>
            <Col xs={12} md={4} className="">
              <p>No 32, St.Annes Road, Kurana, Negombo, Sri Lanka 11500</p>
              <ul class="list-unstyled">
                <li class="color-a">
                  <span class="color-text-a">Phone .</span> +94 (0)766 822 977
                </li>
                <li class="color-a">
                  <span class="color-text-a">Email . </span>
                  support@sriproperty.lk
                </li>
                <li class="color-a">
                  <a
                    href="https://www.facebook.com/sriproperty/"
                    title="Sri Property FaceBook Page"
                    target="_blank"
                    id="fbhl"
                  >
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        <footer className="footer">
          <div className="container">
            <div className="footertext">
              <span className="mr-2">
                {" "}
                Copyright &copy; 2020 All Rights Reserved | SriProperty.lk
              </span>

              <span className="ml-2">
                Designed and Developed by |{" "}
                <a id="omnilink" href="https://omnitechnologies.lk/">
                  {" "}
                  Omni Technologies
                </a>
              </span>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default SPFooter;
