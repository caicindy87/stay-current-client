import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

import authApi from "../../services/authApi";
import "../../style/Login.scss";
import "../../fonts/Geomanist-Regular.otf";
import LoginImage from "../../icons/login.svg";

class Login extends Component {
  state = {
    error: false,
    fields: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleLoginSubmit = (e) => {
    const { handleLogin, history } = this.props;
    const { username, password } = this.state.fields;

    e.preventDefault();

    authApi.auth.login(username, password).then((user) => {
      if (user.error) {
        this.setState({ error: true });
      } else {
        handleLogin(user);
        history.push("/");
      }
    });
  };

  render() {
    const { error, fields } = this.state;

    return (
      <div className="login-form-container">
        <div className="login-image">
          <LoginImage />
        </div>
        <div className="login-form">
          <h1>Log In</h1>
          {error ? (
            <h3 className="login-error-msg">Invalid username or password</h3>
          ) : null}
          <form onSubmit={this.handleLoginSubmit}>
            <label htmlFor="username">Username</label>
            <input
              className="username"
              type="text"
              name="username"
              placeholder="Username"
              value={fields.username}
              onChange={this.handleChange}
            ></input>
            <label htmlFor="username">Password</label>
            <input
              className="password"
              type="password"
              name="password"
              placeholder="Password"
              value={fields.password}
              onChange={this.handleChange}
            ></input>
            <Button fluid>Log In</Button>
          </form>
          <p className="signup-link">
            Need an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
