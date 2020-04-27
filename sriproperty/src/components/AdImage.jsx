import React, { Component } from "react";
import Img from "react-image";

export class AdImage extends Component {
  render() {
    const loader = (
      <div className="mx-auto">
        {" "}
        <div className="mx-auto loader"></div>{" "}
        <div className="mx-auto loadder-text">Image Loading...</div>
      </div>
    );
    return (
      <Img
        src={this.props.imageUrl}
        className={this.props.className}
        loader={loader}
      />
    );
  }
}

export default AdImage;
