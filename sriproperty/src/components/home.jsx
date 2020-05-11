import React, { Component } from "react";
import SliderSearchBox from "./slidersearchbox";
import HomeSlider from "./slider";
import SearchAdvert from "./SearchAdvert";
class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <HomeSlider></HomeSlider>
        <div id="slidersearchdiv" className="slidersearchdivlocation">
          <SliderSearchBox></SliderSearchBox>
        </div>
        <div>
          <SearchAdvert></SearchAdvert>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
