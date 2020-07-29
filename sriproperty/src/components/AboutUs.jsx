import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function AboutUs() {
  return (
    <React.Fragment>
      <Container className="adcontainer-background adtype-wrapper  my-3 generic-border">
        <Row>
          <Col>
            <h3>About Us</h3>
            <p></p>
            <p className="contact-p">
              sriproperty.lk was started with the intention of providing an
              online platform for property owners, landlords and agents in Sri
              Lanka to advertise and sell/rent their property quickly. Our aim
              is to be the online property portal of choice for all Sri Lankans
              where all sellers and landlords will find buyers or tenants for
              their properties, and for buyers/tenants to find their ideal
              property easily and quickly.
            </p>

            <p className="contact-p">
              We continuously thrive to better our service and have invested
              heavily to provide the latest technology and features available to
              our advertisers and visitors to make their property buying and
              selling process simple but effective.
            </p>
            <p className="contact-p">
              Our website is open to anyone to submit their property for sale,
              property for rent, land sales or any such service ads in Sri
              Lanka. You may advertise/rent/sell your property for free* through
              sriproperty.lk. We do not charge for contacting any
              advertiser/poster and completing a transaction (we do not charge
              any fees or commission). All ads on the site are posted directly
              by the owners or their agents and visitors contact these
              advertisers directly with their inquiries. We merely provide an
              online venue for buyers/sellers/tenants/landlords to find/sell
              property in Sri Lanka and post their Sri Lanka ads.
            </p>
            <p className="contact-p">
              sriproperty.lk is owned and managed by Omni Technologies,
              registered in Sri Lanka under No. W.D.16857
            </p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default AboutUs;
