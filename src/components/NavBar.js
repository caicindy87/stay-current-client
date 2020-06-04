import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class NavBar extends Component {
  render() {
    const { handleLogOut, history } = this.props;

    return (
      <div>
        <Link to="/">Stay Current</Link>
        <Link to="/login">Log In</Link>
        <Link
          to="/logout"
          onClick={() => {
            history.push("/");
            handleLogOut();
          }}
        >
          Log Out
        </Link>
      </div>
    );
  }
}

export default withRouter(NavBar);
