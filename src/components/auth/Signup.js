import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import authApi from "../../services/authApi";
import "../../style/Signup.scss";

class Signup extends Component {
  state = {
    error: false,
    fields: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
  };

  handleChange = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };

    this.setState({
      fields: newFields,
    });
  };

  handleSignupSubmit = (e) => {
    const { handleSignup, history } = this.props;

    e.preventDefault();

    authApi.auth.signup(this.state.fields).then((user) => {
      if (user.error) {
        this.setState({ error: true });
      } else {
        handleSignup(user);
        history.push("/");
      }
    });
  };

  render() {
    const { fields, error } = this.state;

    return (
      <div className="signup-form-container">
        <div></div>
        <div className="signup-form">
          <h1>Create an Account</h1>
          {error ? <h3 className="signup-error-msg">Try Again</h3> : null}
          <form onSubmit={this.handleSignupSubmit}>
            <input
              className="username"
              type="text"
              name="username"
              placeholder="Username"
              value={fields.username}
              onChange={this.handleChange}
            ></input>
            <input
              className="email"
              type="text"
              name="email"
              placeholder="Email address"
              value={fields.email}
              onChange={this.handleChange}
            ></input>
            <input
              className="password"
              type="password"
              name="password"
              placeholder="Password"
              value={fields.password}
              onChange={this.handleChange}
            ></input>
            <input
              className="password-confirm"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              value={fields.passwordConfirm}
              onChange={this.handleChange}
            ></input>
            <Button fluid>Create Account</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
