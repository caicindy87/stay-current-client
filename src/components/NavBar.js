import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class NavBar extends Component {
  render() {
    const { handleLogOut, currentUser } = this.props;

    return (
      <nav className="navbar">
        <a href="/" className="logo">
          Stay Current
        </a>
        {!!currentUser.id ? (
          <>
            <Link to={`/${currentUser.username}/posts/new`}>New Post</Link>
            <Link to="/myposts">My Posts</Link>
            <Link
              to="/"
              onClick={() => {
                handleLogOut();
                // history.push("/");
              }}
            >
              Log Out
            </Link>
          </>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </nav>
    );
  }
}

export default withRouter(NavBar);
