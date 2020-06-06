import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class NavBar extends Component {
  render() {
    const { handleLogOut, history, currentUser } = this.props;

    return (
      <nav className="navbar">
        <Link to="/" className="logo">
          Stay Current
        </Link>
        <br />
        {!!currentUser.id ? (
          <>
            <Link to={`/${currentUser.username}/posts/new`}>New Post</Link>
            <br />
            <Link
              to="/logout"
              onClick={() => {
                history.push("/");
                handleLogOut();
              }}
            >
              Log Out
            </Link>
            <br />
          </>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </nav>
    );
  }
}

export default withRouter(NavBar);
