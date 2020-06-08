import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "../style/App.scss";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import About from "./About";
import authApi from "../services/authApi";
import NavBar from "./NavBar";
import PostsContainer from "./post/PostsContainer";
import MyPostsContainer from "../components/myPosts/MyPostsContainer";

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
      authApi.auth.getCurrentUser().then((currentUser) => {
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

  handleSignup = (user) => {
    localStorage.setItem("token", user.token);

    this.setState({
      currentUser: user,
    });
  };

  render() {
    const { currentUser } = this.state;

    return (
      <div className="app">
        <NavBar handleLogOut={this.handleLogOut} currentUser={currentUser} />
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
              return (
                <Signup {...routerProps} handleSignup={this.handleSignup} />
              );
            }}
          ></Route>
          <Route exact path="/" component={About}></Route>
        </Switch>
        <main>
          <PostsContainer currentUser={currentUser} />
          <MyPostsContainer currentUser={currentUser} />
        </main>
      </div>
    );
  }
}

export default App;
