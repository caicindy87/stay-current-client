import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import logo from "../icons/logo.png";
import loginIcon from "../icons/loginIcon.png";
import logoutIcon from "../icons/logoutIcon.png";
import profileIcon from "../icons/profileIcon.png";
import newsIcon from "../icons/newsIcon.jpeg";

class NavBar extends Component {
  state = {
    isButtonActive: false,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.closeSideMenu);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.closeSideMenu);
  }

  handleScroll = () => {
    if (window.scrollY > 20) {
      document.querySelector(".navbar").className = "navbar sticky";
    } else {
      document.querySelector(".navbar").className = "navbar";
    }
  };

  handleClick = () => {
    this.setState({ isButtonActive: !this.state.isButtonActive });
  };

  closeSideMenu = () => {
    this.setState({ isButtonActive: false });
  };

  render() {
    const { handleLogOut, currentUser } = this.props;

    return (
      <nav className="navbar">
        <div className="inner-width">
          <a href="/" className="logo">
            <img src={logo} alt="logo" className="logo-img"></img>
            Stay Current
          </a>
          <button
            className={
              this.state.isButtonActive ? "menu-toggler active" : "menu-toggler"
            }
            onClick={this.handleClick}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div
            className={
              this.state.isButtonActive ? "navbar-menu active" : "navbar-menu"
            }
          >
            <Link to="/news" onClick={this.closeSideMenu}>
              {this.state.isButtonActive ? null : (
                <img src={newsIcon} alt="news-icon" className="icon"></img>
              )}
              News
            </Link>
            {!!localStorage.getItem("token") ? (
              <>
                <Link to="/profile" onClick={this.closeSideMenu}>
                  {this.state.isButtonActive ? null : (
                    <img
                      src={profileIcon}
                      alt="profile-icon"
                      className="icon"
                    ></img>
                  )}
                  {currentUser.username}
                </Link>
              </>
            ) : null}
            {!!localStorage.getItem("token") ? (
              <>
                <Link
                  to="/"
                  onClick={() => {
                    handleLogOut();
                    this.closeSideMenu();
                  }}
                >
                  {this.state.isButtonActive ? null : (
                    <img
                      src={logoutIcon}
                      alt="logout-icon"
                      className="icon"
                    ></img>
                  )}
                  Log Out
                </Link>
              </>
            ) : (
              <Link to="/login" onClick={this.closeSideMenu}>
                {this.state.isButtonActive ? null : (
                  <img src={loginIcon} alt="login-icon" className="icon"></img>
                )}
                Log In
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
