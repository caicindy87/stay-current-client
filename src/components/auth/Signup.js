import React, { Component } from "react";

import authApi from "../../services/authApi";

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
        console.log(user.error);
      } else {
        handleSignup(user);
        history.push("/");
      }
    });
  };

  render() {
    const { fields, error } = this.state;

    return (
      <div>
        <h1>Create an Account</h1>
        {error ? <h3>Try Again</h3> : null}
        <form className="signup-form" onSubmit={this.handleSignupSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            value={fields.email}
            onChange={this.handleChange}
          ></input>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={fields.username}
            onChange={this.handleChange}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={fields.password}
            onChange={this.handleChange}
          ></input>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            value={fields.passwordConfirm}
            onChange={this.handleChange}
          ></input>
          <button>Create Account</button>
        </form>
      </div>
    );
  }
}

export default Signup;
