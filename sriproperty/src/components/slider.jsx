import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel2";
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
              <a href="#">
                <span className="price-a">sell | LKR 18, 000, 000.00</span>
              </a>
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
              <a href="#">
                <span className="price-a">rent | LKR 12, 000, 000.00</span>
              </a>
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
              <a href="#">
                <span className="price-a">sell | LKR 13, 500, 000.00</span>
              </a>
            </p>
          </div>
        </OwlCarousel>
      </React.Fragment>
    );
  }
}

export default HomeSlider;
