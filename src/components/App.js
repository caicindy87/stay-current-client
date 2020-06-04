import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "../style/App.css";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import About from "./About";
import api from "../services/api";
import NavBar from "./NavBar";

class App extends Component {
  state = {
    currentUser: {},
  };

  componentDidMount() {
    this.checkLoginStatus();
  }

  // checkLoginStatus when reload page so user doesn't have to keep signing in
  checkLoginStatus = () => {
    const token = localStorage.getItem("token");

    if (token) {
      api.auth.getCurrentUser().then((currentUser) => {
        if (currentUser.error) {
          console.log(currentUser.error);
        } else {
          this.setState({
            currentUser: currentUser,
          });
        }
      });
    }
  };

  handleLogin = (user) => {
    localStorage.setItem("token", user.token);

    this.setState({
      currentUser: user,
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("token");

    this.setState({
      currentUser: {},
    });
  };

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <NavBar handleLogOut={this.handleLogOut} />
        <Switch>
          <Route
            path="/login"
            render={(routerProps) => {
              return <Login {...routerProps} handleLogin={this.handleLogin} />;
            }}
          ></Route>
          <Route
            path="/signup"
            render={(routerProps) => {
              return <Signup />;
            }}
          ></Route>
          <Route path="/" component={About}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
