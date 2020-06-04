import React, { Component } from "react";
import { Link } from "react-router-dom";

import authApi from "../../services/authApi";

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
      <div>
        <h1>Log In</h1>
        {error ? <h3>Invalid username or password</h3> : null}
        <form className="login-form" onSubmit={this.handleLoginSubmit}>
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
          <button>Log In</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    );
  }
}

export default Login;
