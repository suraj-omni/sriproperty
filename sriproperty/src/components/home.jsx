import React, { Component } from "react";
import SliderSearchBox from "./slidersearchbox";
import HomeSlider from "./slider";

class Home extends Component {

  render() {
    return (
      <React.Fragment>
        <HomeSlider></HomeSlider>
        <div id="slidersearchdiv" className="slidersearchdivlocation">
          <SliderSearchBox></SliderSearchBox>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
