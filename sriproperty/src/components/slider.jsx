import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";

class HomeSlider extends Component {
  state = {
    sliderdistrict:
      "sliderefontloacation sliderfont sliderdistrictfont sliderdistrictlocation",
    slidercity:
      "sliderefontloacation sliderfont slidercityfont slidercitylocation",
    sliderprice: "sliderefontloacation sliderfont pricelocation",
  };

  render() {
    const options = {
      items: 1,
      nav: false,
      rewind: true,
      autoplay: true,
      animateIn: "slideInLeft",
      center: true,
      loop: true,
    };

    return (
      <React.Fragment>
        <OwlCarousel ref="feturedproperties" options={options}>
          <div>
            <div className="overlay overlay-a"></div>
            <img
              className="feturedproperties"
              src="https://firebasestorage.googleapis.com/v0/b/sriproperty-b397e.appspot.com/o/slider%2Fslide-1.JPG?alt=media&token=32d7bdb6-39b0-4cbf-be8a-32a2e5efe3ce"
              alt="House in Mattegoda"
            />
            <div className={this.state.slidercity}>Mattegoda</div>
            <div className={this.state.sliderdistrict}>Colombo</div>
            <p className={this.state.sliderprice}>
              <Link className="price-a" to={`/ad/o4Q864k78ZMf1CcZABFT`}>
                sell | LKR 19 MN
              </Link>
            </p>
          </div>
          <div>
            <div className="overlay overlay-a"></div>
            <img
              src="../../img/slider/slide-2.jpg"
              alt="House in Medawelikada Rajagiriya"
            />
            <div className={this.state.slidercity}>Rajagiriya</div>
            <div className={this.state.sliderdistrict}>Colombo</div>
            <p className={this.state.sliderprice}>
              <Link className="price-a" to={`/ad/e6lzJUY0R2WqS3d04t6Q`}>
                sell | LKR 125.0 MN
              </Link>
            </p>
          </div>
          <div>
            <div className="overlay overlay-a"></div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sriproperty-b397e.appspot.com/o/slider%2Fslide-3.JPG?alt=media&token=74cfa8d3-5b86-47f7-a114-3d08b66bbc4b"
              alt="House in Pannipitiya"
            />
            <div className={this.state.slidercity}>Pannipitiya</div>
            <div className={this.state.sliderdistrict}>Colombo</div>
            <p className={this.state.sliderprice}>
              <Link className="price-a" to={`/ad/Uf1BLI0uoNFQVk5OjYbr`}>
                sell | LKR 13.5 MN
              </Link>
            </p>
          </div>
        </OwlCarousel>
      </React.Fragment>
    );
  }
}

export default HomeSlider;
