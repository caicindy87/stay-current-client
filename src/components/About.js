import React, { Component } from "react";

import HomepageImage from "../icons/homepage.svg";
import "../style/About.scss";

class About extends Component {
  render() {
    return (
      <div className="about">
        <div className="homepage-image">
          <HomepageImage />
        </div>
        <p className="about-text">Surf the news.</p>
      </div>
    );
  }
}

export default About;
