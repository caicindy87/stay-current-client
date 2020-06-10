import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class NavBar extends Component {
  render() {
    const { handleLogOut, currentUser } = this.props;

    return (
      <div className="navbar">
        <a href="/" className="logo">
          Stay Current
        </a>
        <div className="navbar-right">
          {!!currentUser.id ? (
            <>
              <Link
                to="/"
                onClick={() => {
                  handleLogOut();
                }}
              >
                Log Out
              </Link>
              <Link to={`/${currentUser.username}/posts/new`}>New Post</Link>
              <Link to="/mypage">My Page</Link>
            </>
          ) : (
            <Link to="/login">Log In</Link>
          )}
          <Link to="articles">Articles</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
