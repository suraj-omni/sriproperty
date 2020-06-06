import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textboxclass: "p-2",
      navlinkclass: "nav-link",
      errors: {},
      userupdateloading: false,
      name: "",
      user: {},
    };
  }

  componentDidMount = () => {};

  handleChange = (event) => {
    this.props.user.credentials.name = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: {} });

    const updateUsedata = {
      email: this.props.user.credentials.email,
      phonenumber: this.props.user.credentials.phonenumber,
      phonenumberconfirmed: this.props.user.credentials.phonenumberconfirmed,
      name: this.props.user.credentials.name,
      imageUrl: this.props.user.credentials.imageUrl,
    };
    this.setState({ user: updateUsedata });
    this.props.editUserDetails(updateUsedata);
  };

  render() {
    const {
      user: {
        credentials: {
          email,
          phonenumber,
          name,
          imageUrl,
          phonenumberconfirmed,
        },
        loadinguser,
      },
    } = this.props;

    const {
      UI: { loading, loadingupdateuser, msgs, errors, disablebutton },
    } = this.props;
    return (
      <React.Fragment>
        <Container className="my-3">
          <Form onSubmit={this.handleSubmit}>
            <Row className={this.state.rowpadding}>
              <Col className="text-center m-2">
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  className="text-center"
                  placeholder="Enter full name"
                  value={this.props.user.credentials.name}
                  onChange={this.handleChange}
                />
                {errors && errors.name && (
                  <div className="loginerrorlabels">{errors.name}</div>
                )}
              </Col>
            </Row>
            <Row className={this.state.rowpadding}>
              <Col className="text-center m-2">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loadingupdateuser}
                >
                  {loadingupdateuser && (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      visible="false"
                    ></Spinner>
                  )}
                  Update
                </Button>
              </Col>
              <Col xs={12} className="text-center text-info my-2">
                {msgs && msgs.messege && msgs.messege.userupdate && (
                  <div className="loginerrorlabels">
                    {msgs.messege.userupdate}
                  </div>
                )}
              </Col>
            </Row>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

EditProfile.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  editUserDetails,
};

export default connect(mapStateToProps, mapActionsToProps)(EditProfile);
