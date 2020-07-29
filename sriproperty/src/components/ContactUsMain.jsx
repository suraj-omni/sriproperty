import React from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ContactUs from "./ContactUs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSquareAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function ContactUsMain() {
  return (
    <React.Fragment>
      <Container className="adcontainer-background adtype-wrapper  my-3 generic-border">
        <Row>
          <Col xs={12} md={6}>
            <Container className="p-3">
              <Table>
                <Row>
                  <Col className="contact-us-icons">
                    <FontAwesomeIcon icon={faPhoneSquareAlt} size="3x" />
                  </Col>
                </Row>
                <Row>
                  <Col className="contact-large-font">Call Us</Col>
                </Row>
                <Row>
                  <Col>+94 (0)766 822 977</Col>
                </Row>
                <p></p>

                <Row>
                  <Col className="contact-us-icons">
                    <FontAwesomeIcon icon={faEnvelope} size="3x" />
                  </Col>
                </Row>
                <Row>
                  <Col className="contact-large-font">Email Us</Col>
                </Row>
                <Row>
                  <Col>support@sriproperty.lk</Col>
                </Row>
                <p></p>
                <Row>
                  <Col className="contact-us-icons">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />
                  </Col>
                </Row>
                <Row>
                  <Col className="contact-large-font">Address</Col>
                </Row>
                <Row>
                  <Col>
                    No 32, St.Annes Road, Kurana, Negombo, 11500, Sri Lanka
                  </Col>
                </Row>
                <p></p>
                <Row>
                  <Col className="contact-large-font">Social media</Col>
                </Row>
                <Row>
                  <Col className="contact-us-icons">
                    <a
                      href="https://www.facebook.com/sriproperty/"
                      title="Sri Property FB Page"
                      target="_blank"
                      id="fbhl"
                    >
                      <FontAwesomeIcon icon={faFacebook} size="3x" />
                    </a>
                  </Col>
                </Row>
              </Table>
            </Container>
          </Col>
          <Col xs={12} md={6}>
            <ContactUs></ContactUs>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default ContactUsMain;
