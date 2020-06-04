import React, { Component } from "react";

class Signup extends Component {
  state = {
    error: false,
    fields: {
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

  render() {
    const { fields } = this.state;

    return (
      <div>
        <form className="signup-form" onSubmit={this.handleSubmit}>
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
