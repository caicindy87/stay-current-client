import React, { Component } from "react";

import homepageImg from "../icons/surfNews.png";
import "../style/About.scss";

class About extends Component {
  render() {
    return (
      <div className="about">
        <div className="homepage-image">
          <img src={homepageImg} alt="" />
        </div>
        <p className="about-text">Surf the news.</p>
      </div>
    );
  }
}

export default About;
