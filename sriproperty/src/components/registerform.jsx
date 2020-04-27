import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

const INITIAL_STATE = {
  textboxclass: "p-2",
  navlinkclass: "nav-link",
  firstname: "",
  lastname: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class RegisterForm extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { email, passwordOne } = this.state;
    /*     console.log("firebase", this.props.firebase);
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        alert("You are successfully registered.");
      })
      .catch(error => {
        this.setState({ error:error || {} });
        console.log("errors", error);
      }); */
    event.preventDefault();
  };

  render() {
    return (
      <Container>
        {this.state.error && this.state.error.message && (
          <div className="alert alert-danger">{this.state.error.message}</div>
        )}
        <Form onSubmit={this.onSubmit}>
          <Row className={this.state.textboxclass}>
            <Col>
              <Form.Control
                placeholder="First name"
                type="text"
                name="firstname"
                onChange={this.onChange.bind(this)}
              />
            </Col>
          </Row>
          <Row className={this.state.textboxclass}>
            <Col>
              <Form.Control
                placeholder="Last name"
                type="text"
                name="lastname"
                onChange={this.onChange.bind(this)}
              />
            </Col>
          </Row>
          <Row className={this.state.textboxclass}>
            <Col>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={this.onChange.bind(this)}
              />
            </Col>
          </Row>
          <Row className={this.state.textboxclass}>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                name="passwordOne"
                onChange={this.onChange.bind(this)}
              />
            </Col>
          </Row>
          <Row className={this.state.textboxclass}>
            <Col>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="passwordTwo"
                onChange={this.onChange.bind(this)}
              />
            </Col>
          </Row>
          <Row className={this.state.textboxclass}>
            <Col>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Col>
          </Row>
          <Row className={this.state.textboxclass}>
            <Col lg={6} className="align-items-center p-1">
              Already have an account?
            </Col>
            <Col lg={6} className="align-items-center p-1">
              <Link to="/login" className={this.state.navlinkclass}>
                Click here to Login
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default RegisterForm;
