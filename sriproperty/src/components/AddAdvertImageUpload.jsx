import React, { Component, lazy, Suspense } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";

import {
  uploadAdImage,
  getAdvertbyId,
  deleteAdImage,
  setAdvert,
  pushtoReviewAdvert,
} from "../redux/actions/adActions";

import { ADVERT_STATUS_NEEDEDIT, ADVERT_STATUS_INREVIEW } from "../redux/types";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Resizer from "react-image-file-resizer";
const AdImage = lazy(() => import("./AdImage"));

class AddAdvertImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textboxclass: "p-2",
      navlinkclass: "nav-link",
      colpadding: "p-2",
      advert: {},
      cities: [],
      errors: {},
      noimageUrl:
        "https://firebasestorage.googleapis.com/v0/b/sriproperty-b397e.appspot.com/o/no-image-icon.png?alt=media&token=4780d1a3-6f2c-4710-9020-608defa1ab8a",
      // "https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/no-image-icon.png?alt=media",
      selecteddistrict: "",
      showmodal: false,
    };
  }

  componentDidMount = () => {
    /* let advert = this.props.ad.advert;
    console.log("componentDidMount", this.props.ad.advert);
    if (advert.advertid) {
      if (!this.props.advert.advertid) {
        this.props.getAdvertbyId(advert);

      }
    } else {
      alert("Error");

    } */
  };

  handleClose = () => {
    this.setState({ showmodal: false });
  };

  handleFinishPostAd = () => {
    this.props.pushtoReviewAdvert(this.props.ad.advert.advertid);
    this.setState({ showmodal: true });
  };

  getinputname = (name) => {
    switch (name) {
      case "btnUploadImage1":
        return "adImage1";
      case "btnUploadImage2":
        return "adImage2";
      case "btnUploadImage3":
        return "adImage3";
      case "btnUploadImage4":
        return "adImage4";
      case "btnUploadImage5":
        return "adImage5";
      default:
        return null;
    }
  };

  getDeleteAdvert = (name) => {
    let deleteAdvert = { advertid: "", imageUrl: "", advertimageno: 0 };
    const advert = this.props.ad.advert;

    const advertid = advert.advertid;

    switch (name) {
      case "btnUploadImage1":
        return (deleteAdvert = {
          advertid: advertid,
          imageUrl: advert.image1Url,
          advertimageno: 1,
        });
      case "btnUploadImage2":
        return (deleteAdvert = {
          advertid: advertid,
          imageUrl: advert.image2Url,
          advertimageno: 2,
        });
      case "btnUploadImage3":
        return (deleteAdvert = {
          advertid: advertid,
          imageUrl: advert.image3Url,
          advertimageno: 3,
        });
      case "btnUploadImage4":
        return (deleteAdvert = {
          advertid: advertid,
          imageUrl: advert.image4Url,
          advertimageno: 4,
        });
      case "btnUploadImage5":
        return (deleteAdvert = {
          advertid: advertid,
          imageUrl: advert.image5Url,
          advertimageno: 5,
        });
      default:
        return null;
    }
  };

  handleUploadPicture = (event) => {
    const inputname = this.getinputname(event.target.name);
    const fileinput = document.getElementById(inputname);
    fileinput.click();
  };

  resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800,
        600,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });

  handleImage1Change = async (event) => {
    const file = event.target.files[0];
    const filename = file.name;
    const image = await this.resizeFile(file);
    this.handleUpload(1, image, filename);
  };

  handleImage2Change = async (event) => {
    const file = event.target.files[0];
    const filename = file.name;
    const image = await this.resizeFile(file);
    this.handleUpload(2, image, filename);
  };

  handleImage3Change = async (event) => {
    const file = event.target.files[0];
    const filename = file.name;
    const image = await this.resizeFile(file);
    this.handleUpload(3, image, filename);
  };

  handleImage4Change = async (event) => {
    const file = event.target.files[0];
    const filename = file.name;
    const image = await this.resizeFile(file);
    this.handleUpload(4, image, filename);
  };

  handleImage5Change = async (event) => {
    const file = event.target.files[0];
    const filename = file.name;
    const image = await this.resizeFile(file);
    this.handleUpload(5, image, filename);
  };

  handleDeleteImage = (event) => {
    const deleteAdvert = this.getDeleteAdvert(event.target.name);
    if (deleteAdvert) {
      this.props.deleteAdImage(deleteAdvert);
    }
  };

  handleUpload = (imageno, image, filename) => {
    const formdata = new FormData();
    formdata.append("image", image, filename);
    formdata.append("advertimageno", imageno);
    formdata.append("advertid", this.props.ad.advert.advertid);
    this.props.uploadAdImage(formdata, imageno);
  };

  render() {
    const {
      UI: {
        inprogress1,
        inprogress2,
        inprogress3,
        inprogress4,
        inprogress5,
        deletingimage1,
        deletingimage2,
        deletingimage3,
        deletingimage4,
        deletingimage5,
        loading,
        disablebutton,
      },
    } = this.props;

    const {
      adverttype,
      advertStatus,
      category,
      district,
      city,
      title,
      image1Url,
      image2Url,
      image3Url,
      image4Url,
      image5Url,
      adminComments,
    } = this.props.ad.advert;
    const noimageUrl = this.state.noimageUrl;

    const showComments =
      advertStatus === ADVERT_STATUS_NEEDEDIT && adminComments !== ""
        ? true
        : false;

    const invalid = image1Url === "" ? true : false;
    const disable_all = advertStatus === ADVERT_STATUS_INREVIEW ? true : false;

    if (loading)
      return (
        <React.Fragment>
          <div className="mx-auto">
            {" "}
            <div className="mx-auto loader"></div>{" "}
            <div className="mx-auto loadder-text">Loading Data...</div>
          </div>
        </React.Fragment>
      );

    return (
      <React.Fragment>
        <Container className="adcontainer-background adtype-wrapper my-3 generic-border">
          <Table>
            <Row className={`${this.state.colpadding}`}>
              <Col className={`${this.state.colpadding} h5 text-center`}>
                {`Please upload photos of the  '${category}' you want to '${adverttype}'`}
              </Col>
            </Row>
            {/* progress indicator */}
            <Row>
              <Col className={`text-center`}>
                {/* arrow indicator */}
                <div className="d-flex bg-highlight">
                  <div className="px-2 flex-fill"></div>
                  <div className="px-2 flex-fill"></div>
                  <div className="px-2 flex-fill"></div>
                  <div className="px-2 flex-fill">
                    <FontAwesomeIcon
                      style={{ color: "#6DB65B" }}
                      icon={faCaretDown}
                      size="2x"
                      title="This is where you are now."
                    />
                  </div>
                </div>
                {/* arrow indicator end */}
                <div id="progresscontainer" className="d-flex bg-highlight">
                  <div id="step1" className="progressinactive p-2 flex-fill">
                    Step 1:- Sell or Rent?
                  </div>
                  <div id="step2" className="progressinactive p-2 flex-fill">
                    Step 2:- Pick Category
                  </div>
                  <div id="step3" className="progressinactive p-2 flex-fill">
                    Step 3:- Fill Details
                  </div>
                  <div id="step4" className="progressactive p-2 flex-fill">
                    Step 4:- Upload images
                  </div>
                </div>
              </Col>
            </Row>
            {/* end of progress indicator */}
            {showComments && (
              <Row className="mx-auto my-3 d-flex bg-highlight border  advertedit_admincomments">
                <Col className="px-2 pt-2 pb-1 flex-fill">
                  <p>
                    We would like to suggest the following changes in the advert
                    details and photos. Please do the required changes and
                    re-submit the Advert for review.
                  </p>
                </Col>
                <Col className="px-2 pb-2 pt-1 flex-fill advertedit_admincomments_details">
                  {adminComments}
                </Col>
              </Row>
            )}

            {/* advert info */}
            <Row className={`${this.state.colpadding}`}>
              <Col className={`${this.state.colpadding}`}>
                <div
                  id="advertinfo"
                  className="d-flex flex-wrap  generic-border align-items-center"
                >
                  <div id="infotitle" className="p-1 flex-grow-1 text-left">
                    {`${title}`}
                  </div>
                  <div id="infodistrict" className="p-1 text-left">
                    {`District :  ${district}`}
                  </div>
                  <div id="infocity" className="p-1 text-left">
                    {`City :  ${city}`}
                  </div>
                </div>
              </Col>
            </Row>
            {/* end of advert info */}
            {/* note */}
            <Row className={`${this.state.colpadding}`}>
              <Col className={`${this.state.colpadding}`}>
                <div className="d-flex flex-wrap  bg-highlight align-items-center">
                  <div className="p-1 flex-grow-1 text-left text-danger">
                    <strong>*</strong> Uploading Main Image is mandatory
                  </div>
                </div>
              </Col>
            </Row>
            {/* note */}
            {/* photos */}
            <div class="d-flex flex-column flex-lg-row justify-content-center">
              {/* image 1 */}
              <div class="p-2 justify-content-center">
                <div className="p-2">
                  <strong>Main image</strong>
                </div>

                <Row>
                  <Col className="my-auto mx-auto p-2" xs={12}>
                    <div class="dvContainer">
                      {image1Url !== "" && (
                        <Suspense
                          fallback={<div className="loader mx-auto"></div>}
                        >
                          <AdImage
                            imageUrl={image1Url}
                            className="postad-imageuplload-img-tn"
                          />
                        </Suspense>
                      )}
                      {image1Url === "" && (
                        <Suspense
                          fallback={<div className="loader mx-auto"></div>}
                        >
                          <AdImage
                            imageUrl={noimageUrl}
                            className="postad-imageuplload-emptyimg-tn"
                          />
                        </Suspense>
                      )}
                      <div className="dvInsideTL">
                        {image1Url === "" && inprogress1 && (
                          <div className="mx-auto">
                            <div className="mx-auto loader"></div>
                            <div className="mx-auto loadder-text">
                              Uploading...
                            </div>
                          </div>
                        )}
                        {image1Url !== "" && deletingimage1 && (
                          <div className="mx-auto">
                            <div className="mx-auto loader"></div>
                            <div className="mx-auto loadder-text2">
                              Deleting...
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      id="adImage1"
                      onChange={this.handleImage1Change}
                      hidden="hidden"
                    ></input>
                  </Col>
                  <Col className="p-2">
                    {image1Url === "" && (
                      <Button
                        variant="primary"
                        size="sm"
                        name="btnUploadImage1"
                        onClick={this.handleUploadPicture}
                        disabled={inprogress1 || disable_all}
                      >
                        Upload Image
                      </Button>
                    )}
                    {image1Url !== "" && (
                      <Button
                        variant="primary"
                        size="sm"
                        name="btnUploadImage1"
                        onClick={this.handleDeleteImage}
                        disabled={deletingimage1 || disable_all}
                      >
                        Delete Image
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>
              {/* end of image 1 */}
              {/* image 2  */}
              <div class="p-2 justify-content-center">
                <div className="p-2">Image 2</div>
                <Row>
                  <Col className="my-auto mx-auto p-2" xs={12}>
                    <div class="dvContainer">
                      {image2Url !== "" && (
                        <Suspense
                          fallback={<div className="loader mx-auto"></div>}
                        >
                          <AdImage
                            imageUrl={image2Url}
                            className="postad-imageuplload-img-tn"
                          />
                        </Suspense>
                      )}
                      {image2Url === "" && (
                        <Suspense
                          fallback={<div className="loader mx-auto"></div>}
                        >
                          <AdImage
                            imageUrl={noimageUrl}
                            className="postad-imageuplload-emptyimg-tn"
                          />
                        </Suspense>
                      )}
                      <div className="dvInsideTL">
                        {image2Url === "" && inprogress2 && (
                          <div className="mx-auto">
                            <div className="mx-auto loader"></div>
                            <div className="mx-auto loadder-text">
                              Uploading...
                            </div>
                          </div>
                        )}
                        {image2Url !== "" && deletingimage2 && (
                          <div className="mx-auto">
                            <div className="mx-auto loader"></div>
                            <div className="mx-auto loadder-text2">
                              Deleting...
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      id="adImage2"
                      onChange={this.handleImage2Change}
                      hidden="hidden"
                    ></input>
                  </Col>
                  <Col className="p-2">
                    {image2Url === "" && (
                      <Button
                        variant="primary"
                        size="sm"
                        name="btnUploadImage2"
                        onClick={this.handleUploadPicture}
                        disabled={inprogress2 || disable_all}
                      >
                        Upload Image
                      </Button>
                    )}
                    {image2Url !== "" && (
                      <Button
                        variant="primary"
                        size="sm"
                        name="btnUploadImage2"
                        onClick={this.handleDeleteImage}
                        disabled={deletingimage2 || disable_all}
                      >
                        Delete Image
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>
              {/* end of image 2 */}
              {/* image 3 */}
              <div class="p-2 justify-content-center">
                <div className="p-2">Image 3</div>
                <Row>
                  <Col className="my-auto mx-auto p-2" xs={12}>
                    <div class="dvContainer">
                      {image3Url !== "" && (
                        <Suspense
                          fallback={<div className="loader mx-auto"></div>}
                        >
                          <AdImage
                            imageUrl={image3Url}
                            className="postad-imageuplload-img-tn"
                          />
                        </Suspense>
                      )}
                      {image3Url === "" && (
                        <Suspense
                          fallback={<div className="loader mx-auto"></div>}
                        >
                          <AdImage
                            imageUrl={noimageUrl}
                            className="postad-imageuplload-emptyimg-tn"
                          />
                        </Suspense>
                      )}
                      <div className="dvInsideTL">
                        {image3Url === "" && inprogress3 && (
                          <div className="mx-auto">
                            <div className="mx-auto loader"></div>
                            <div className="mx-auto loadder-text">
                              Uploading...
                            </div>
                          </div>
                        )}
                        {image3Url !== "" && deletingimage3 && (
                          <div className="mx-auto">
                            <div className="mx-auto loader"></div>
                            <div className="mx-auto loadder-text2">
                              Deleting...
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      id="adImage3"
                      onChange={this.handleImage3Change}
                      hidden="hidden"
                    ></input>
                  </Col>
                  <Col className="p-2">
                    {image3Url === "" && (
                      <Button
                        variant="primary"
                        size="sm"
                        name="btnUploadImage3"
                        onClick={this.handleUploadPicture}
                        disabled={inprogress3 || disable_all}
                      >
                        Upload Image
                      </Button>
                    )}
                    {image3Url !== "" && (
                      <Button
                        variant="primary"
                        size="sm"
                        name="btnUploadImage3"
                        onClick={this.handleDeleteImage}
                        disabled={deletingimage3 || disable_all}
                      >
                        Delete Image
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>
              {/* end of image 3 */}
              {/* image 4 */}
              <div class="p-2 justify-content-center">
                <div className="p-2">Image 4</div>
                <Row>
                  <Col className="my-auto mx-auto p-2" xs={12}>
                    <div class="dvContainer">
                      {image4Url !== "" && (
                        <Suspense
                          fallback={<div className="loader mx-auto"></div>}
                        >
                          <AdImage
                            imageUrl={image4Url}
                            className="postad-imageuplload-img-tn"
                          />
                        </Suspense>
                      )}
                      {image4Url === "" && (
                        <Suspense
                          fallback={<div className="loader mx-auto"></div>}
                        >
                          <AdImage
                            imageUrl={noimageUrl}
                            className="postad-imageuplload-emptyimg-tn"
                          />
                        </Suspense>
                      )}
                      <div className="dvInsideTL">
                        {image4Url === "" && inprogress4 && (
                          <div className="mx-auto">
                            <div className="mx-auto loader"></div>
                            <div className="mx-auto loadder-text">
                              Uploading...
                            </div>
                          </div>
                        )}
                        {image4Url !== "" && deletingimage4 && (
                          <div className="mx-auto">
                            <div className="mx-auto loader"></div>
                            <div className="mx-auto loadder-text2">
                              Deleting...
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      id="adImage4"
                      onChange={this.handleImage4Change}
                      hidden="hidden"
                    ></input>
                  </Col>
                  <Col className="p-2">
                    {image4Url === "" && (
                      <Button
                        variant="primary"
                        size="sm"
                        name="btnUploadImage4"
                        onClick={this.handleUploadPicture}
                        disabled={inprogress4 || disable_all}
                      >
                        Upload Image
                      </Button>
                    )}
                    {image4Url !== "" && (
                      <Button
                        variant="primary"
                        size="sm"
                        name="btnUploadImage4"
                        onClick={this.handleDeleteImage}
                        disabled={deletingimage4 || disable_all}
                      >
                        Delete Image
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>
              {/* end of image 4  */}
              {/* image 5 */}
              <div class="p-2 justify-content-center">
                <div className="p-2">Image 5</div>
                <Row>
                  <Col className="my-auto mx-auto p-2" xs={12}>
                    <div class="dvContainer">
                      {image5Url !== "" && (
                        <Suspense
                          fallback={<div className="loader mx-auto"></div>}
                        >
                          <AdImage
                            imageUrl={image5Url}
                            className="postad-imageuplload-img-tn"
                          />
                        </Suspense>
                      )}
                      {image5Url === "" && (
                        <Suspense
                          fallback={<div className="loader mx-auto"></div>}
                        >
                          <AdImage
                            imageUrl={noimageUrl}
                            className="postad-imageuplload-emptyimg-tn"
                          />
                        </Suspense>
                      )}
                      <div className="dvInsideTL">
                        {image5Url === "" && inprogress5 && (
                          <div className="mx-auto">
                            <div className="mx-auto loader"></div>
                            <div className="mx-auto loadder-text">
                              Uploading...
                            </div>
                          </div>
                        )}
                        {image5Url !== "" && deletingimage5 && (
                          <div className="mx-auto">
                            <div className="mx-auto loader"></div>
                            <div className="mx-auto loadder-text2">
                              Deleting...
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      id="adImage5"
                      onChange={this.handleImage5Change}
                      hidden="hidden"
                    ></input>
                  </Col>
                  <Col className="p-2">
                    {image5Url === "" && (
                      <Button
                        variant="primary"
                        size="sm"
                        name="btnUploadImage5"
                        onClick={this.handleUploadPicture}
                        disabled={inprogress5 || disable_all}
                      >
                        Upload Image
                      </Button>
                    )}
                    {image5Url !== "" && (
                      <Button
                        variant="primary"
                        size="sm"
                        name="btnUploadImage5"
                        onClick={this.handleDeleteImage}
                        disabled={deletingimage5 || disable_all}
                      >
                        Delete Image
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>
              {/* end of image 5 */}
            </div>
            {/* end of photos */}
            <Row className={`${this.state.colpadding}`}>
              <Col className={`${this.state.colpadding}`}>
                <Button
                  variant="primary"
                  size="sm"
                  name="btnDone"
                  disabled={invalid || disablebutton || disable_all}
                  onClick={this.handleFinishPostAd}
                >
                  I have finished Posting Ad
                </Button>
              </Col>
            </Row>
            <Modal
              show={this.state.showmodal}
              onHide={this.handleClose}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <h5>Thank you for Posting !!!</h5>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>What's next?</h5>
                <p>
                  Thank you for posting an advert with Sri Proprty. We will
                  start review your ad and post it in our web site soon. An
                  agent of Sri Property will call you to confirm details if
                  necessary. For more inquieries contact us on
                  support@sriproperty.lk or +94 766822977.
                </p>

                <p>
                  <h5>What would you want to do next?</h5>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Link
                  to="/postad"
                  className={`progresslink ${this.state.navlinkclass}`}
                >
                  Post another Ad
                </Link>
                <Link
                  to="/myads"
                  className={`progresslink ${this.state.navlinkclass}`}
                >
                  Go to my Ads
                </Link>
                <Link
                  to="/"
                  className={`progresslink ${this.state.navlinkclass}`}
                >
                  Go to Home page
                </Link>
              </Modal.Footer>
            </Modal>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

AddAdvertImageUpload.propTypes = {
  uploadAdImage: PropTypes.func.isRequired,
  getAdvertbyId: PropTypes.func.isRequired,
  deleteAdImage: PropTypes.func.isRequired,
  pushtoReviewAdvert: PropTypes.func.isRequired,
  setAdvert: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  ad: PropTypes.object.isRequired,
  advert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI,
  ad: state.ad,
  advert: state.ad.advert,
});

const mapActionsToProps = {
  uploadAdImage,
  getAdvertbyId,
  deleteAdImage,
  setAdvert,
  pushtoReviewAdvert,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddAdvertImageUpload);
