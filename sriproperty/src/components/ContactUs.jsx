import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import Joi from "joi-browser";
import Loader from "./Loader";

const ini_state = {
  email_params: {
    name: "",
    email: "",
    messege: "",
    phone: "",
  },
  service_id: "sriproperty",
  template_id: "supportemail_template",
  errors: {},
  disbleBookingButton: false,
  processing: false,
  messegesent: false,
  showAlert: false,
};

export class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = { ...ini_state };
  }

  schema = {
    name: Joi.string().required().min(3).max(100).label("Name"),
    phone: Joi.string()
      .required()
      .regex(/^[0-9]{10}$/)
      .min(10)
      .max(10)
      .options({
        language: {
          any: {
            empty: " is required",
            required: " is required",
          },
          string: {
            min: " is not valid",
            min: " is not valid",
            regex: {
              base: " is not valid",
            },
          },
        },
      })
      .label("Phone number"),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "lk", "net"] },
      })
      .label("Email"),
    messege: Joi.string().required().min(10).max(1000).label("Messege"),
  };

  handleAlertClose = () => {
    this.setState({ showAlert: false });
  };

  validate = () => {
    const errors = {};
    const email_params = { ...this.state.email_params };

    const errorresult = Joi.validate(email_params, this.schema, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (errorresult && errorresult.error) {
      for (let item of errorresult.error.details) {
        errors[item.path[0]] = item.message;
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validatefield = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const errors = { ...this.state.errors };
    const objerror = { ...Joi.validate(obj, schema) };

    if (objerror.error && objerror.error.details) {
      errors[name] = objerror.error.details[0].message;
    } else {
      delete errors[name];
    }

    this.setState({
      errors,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    const email_params = { ...this.state.email_params };
    email_params[`${name}`] = value;

    this.validatefield(name, value);

    this.setState({ email_params });
  };

  handleSendEmail = () => {
    this.validate();
    const errors = this.validate();

    this.setState({
      errors,
    });
    if (!errors) {
      this.sendFeedback();
    }
  };

  sendFeedback = () => {
    this.setState({
      processing: true,
    });
    const email_params = { ...this.state.email_params };
    window.emailjs
      .send(this.state.service_id, this.state.template_id, email_params)
      .then((res) => {
        this.state = { ...ini_state };
        this.setState({
          messegesent: true,
          processing: false,
          showAlert: true,
        });
      })
      // Handle errors here however you like
      .catch((err) => console.error("Failed to send feedback. Error: ", err));
  };

  render() {
    return (
      <React.Fragment>
        <Container className="adcontainer-background adtype-wrapper  my-3 generic-border">
          <Form onSubmit={this.handleFormSubmit}>
            <Row className="mx-auto">
              <Col xs={12}>
                <Form.Group
                  as={Row}
                  controlId="customer_name"
                  className="mx-auto"
                >
                  <Form.Label column>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    onChange={this.handleChange}
                  />
                  {this.state.errors && this.state.errors.name && (
                    <span className="mx-auto contact-us-error">
                      {this.state.errors.name}
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group as={Row} controlId="email" className="mx-auto">
                  <Form.Label column>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    onChange={this.handleChange}
                  />
                  {this.state.errors && this.state.errors.email && (
                    <span className="mx-auto contact-us-error">
                      {this.state.errors.email}
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group as={Row} controlId="phone" className="mx-auto">
                  <Form.Label column>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    type="text"
                    placeholder="Your Phone"
                    onChange={this.handleChange}
                  />
                  {this.state.errors && this.state.errors.phone && (
                    <span className="mx-auto contact-us-error">
                      {this.state.errors.phone}
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group
                  as={Row}
                  controlId="customer_name"
                  className="mx-auto"
                >
                  <Form.Label column>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Your Message"
                    name="messege"
                    onChange={this.handleChange}
                  />
                  {this.state.errors && this.state.errors.messege && (
                    <span className="mx-auto  contact-us-error">
                      {this.state.errors.messege}
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col>
                {!this.state.processing && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={this.handleSendEmail}
                    disabled={this.state.messegesent}
                  >
                    Send Messege
                  </Button>
                )}

                {this.state.processing && (
                  <Loader displaytext="Sending messege..."></Loader>
                )}
              </Col>
            </Row>
          </Form>
          {this.state.showAlert && (
            <React.Fragment>
              <div class="d-flex p-2">
                <Toast
                  id="contactustoast"
                  onClose={this.handleAlertClose}
                  show={this.state.showAlert}
                  animation={true}
                  delay={5000}
                  autohide
                  className=""
                >
                  <Toast.Header
                    id="contactustoast_header"
                    className="text-white"
                  >
                    <strong className="mr-auto">Thank you!!</strong>
                  </Toast.Header>
                  <Toast.Body>
                    Thank you for Contacting us.
                    <p>We will get back to you as soon as possible.</p>
                  </Toast.Body>
                </Toast>
              </div>
            </React.Fragment>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default ContactUs;
