import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel2";
import "owl.carousel/dist/assets/owl.carousel.css";

class HomeSlider extends Component {
  state = {
    sliderdistrict:
      "sliderefontloacation sliderfont sliderdistrictfont sliderdistrictlocation",
    slidercity:
      "sliderefontloacation sliderfont slidercityfont slidercitylocation",
    sliderprice: "sliderefontloacation sliderfont pricelocation"
  };

  render() {
    const options = {
      items: 1,
      nav: false,
      rewind: true,
      autoplay: true,
      animateIn: "slideInLeft",
      center: true,
      loop: true
    };

    return (
      <React.Fragment>
        <OwlCarousel ref="feturedproperties" options={options}>
          <div>
            <div className="overlay overlay-a"></div>
            <img src="../../img/slider/slide-1.jpg" alt="The Last of us" />
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
            <img src="../../img/slider/slide-2.jpg" alt="GTA V" />
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
            <img src="../../img/slider/slide-3.jpg" alt="Mirror Edge" />
            <div className={this.state.slidercity}>Rajagiriya</div>
            <div className={this.state.sliderdistrict}>Colombo</div>
            <p className={this.state.sliderprice}>
              <a href="#">
                <span className="price-a">rent | LKR 12, 000, 000.00</span>
              </a>
            </p>
          </div>
          
        </OwlCarousel>
      </React.Fragment>
    );
  }
}

export default HomeSlider;
