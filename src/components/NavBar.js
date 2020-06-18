import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import logo from "../icons/logo.jpg";
import loginIcon from "../icons/loginIcon.jpg";
import logoutIcon from "../icons/logoutIcon.jpg";
import profileIcon from "../icons/profileIcon.jpg";
import newsIcon from "../icons/newsIcon.jpeg";

class NavBar extends Component {
  render() {
    const { handleLogOut, currentUser } = this.props;

    return (
      <div className="navbar">
        <a href="/" className="logo">
          <img src={logo} alt="logo" className="logo-img"></img>
          Stay Current
        </a>
        <div className="navbar-right">
          {!!localStorage.getItem("token") ? (
            <>
              <Link
                to="/"
                onClick={() => {
                  handleLogOut();
                }}
              >
                <img src={logoutIcon} alt="logout-icon" className="icon"></img>
                Log Out
              </Link>
            </>
          ) : (
            <Link to="/login">
              <img src={loginIcon} alt="login-icon" className="icon"></img>
              Log In
            </Link>
          )}
          {!!localStorage.getItem("token") ? (
            <>
              <Link to="/profile">
                <img
                  src={profileIcon}
                  alt="profile-icon"
                  className="icon"
                ></img>
                {currentUser.username}
              </Link>
            </>
          ) : null}
          <Link to="/news">
            <img src={newsIcon} alt="news-icon" className="icon"></img>
            News
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
