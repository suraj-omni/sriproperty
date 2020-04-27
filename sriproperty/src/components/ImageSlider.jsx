import React, { Component } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export default class ImageSlider extends Component {
  render() {
    return <ImageGallery items={this.props.images} />;
  }
}
