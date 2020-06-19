import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "../style/App.scss";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import NavBar from "./NavBar";
import PostsContainer from "./post/PostsContainer";
import MyPostsContainer from "../components/myPosts/MyPostsContainer";
import authApi from "../services/authApi";
import tagApi from "../services/tagApi";
import myPostApi from "../services/myPostApi";
import ArticlesContainer from "./articles/ArticlesContainer";

class App extends Component {
  state = {
    currentUser: {},
    tags: [],
    myPosts: [],
    errors: { currentUser: [], myPost: [] },
  };

  componentDidMount() {
    this.checkLoginStatus();
    this.fetchTags();
  }

  checkLoginStatus = () => {
    const token = localStorage.getItem("token");

    if (token) {
      authApi.auth.getCurrentUser().then((currentUser) => {
        if (currentUser.error) {
          this.setState({
            errors: { ...this.state.errors, currentUser: currentUser.error },
          });
        } else {
          this.setState(
            { currentUser: currentUser },
            this.fetchMyPosts(currentUser)
          );
        }
      });
    }
  };

  handleLogin = (user) => {
    localStorage.setItem("token", user.token);

    this.setState({ currentUser: user }, this.fetchMyPosts(user));
  };

  handleLogOut = () => {
    localStorage.removeItem("token");

    this.setState({
      currentUser: {},
      myPosts: [],
    });
  };

  handleSignup = (user) => {
    localStorage.setItem("token", user.token);

    this.setState({
      currentUser: user,
    });
  };

  fetchTags = () => {
    tagApi
      .getTags()
      .then((tags) => this.setState({ tags: tags }))
      .catch((err) => console.log(err));
  };

  fetchMyPosts = (user) => {
    const token = localStorage.getItem("token");

    myPostApi
      .getMyPosts(user, token)
      .then((posts) => this.setState({ myPosts: posts }));
  };

  updateMyPostsOnNewPostSubmit = (newPost) => {
    this.setState({
      myPosts: [...this.state.myPosts, newPost],
    });
  };

  handleEditPostSubmit = (e, inputs, postId) => {
    const { currentUser } = this.state;
    const token = localStorage.getItem("token");

    e.preventDefault();

    myPostApi
      .editMyPost(inputs, currentUser, postId, token)
      .then((updatedPost) => {
        if (updatedPost.error) {
          this.setState({
            errors: { ...this.state.errors, myPost: updatedPost.error },
          });
        } else {
          this.setState((prevState) => ({
            errors: { ...this.state.errors, myPost: [] },
            myPosts: prevState.myPosts.map((post) =>
              post.post_info.id === updatedPost.post_info.id
                ? updatedPost
                : post
            ),
          }));
        }
      });
  };

  handleDeletePost = (postId) => {
    const { currentUser } = this.state;
    const token = localStorage.getItem("token");

    myPostApi.deleteMyPost(currentUser, postId, token).then((data) => {
      this.setState((prevState) => ({
        myPosts: prevState.myPosts.filter(
          (myPost) => myPost.post_info.id !== postId
        ),
      }));
    });
  };

  render() {
    const { currentUser, tags, myPosts, errors } = this.state;

    return (
      <div className="app">
        <NavBar handleLogOut={this.handleLogOut} currentUser={currentUser} />
        <main>
          <Switch>
            <Route
              exact
              path="/login"
              render={(routerProps) => {
                return (
                  <Login {...routerProps} handleLogin={this.handleLogin} />
                );
              }}
            ></Route>
            <Route
              exact
              path="/signup"
              render={(routerProps) => {
                return (
                  <Signup {...routerProps} handleSignup={this.handleSignup} />
                );
              }}
            ></Route>
          </Switch>
          <PostsContainer
            currentUser={currentUser}
            tags={tags}
            updateMyPostsOnNewPostSubmit={this.updateMyPostsOnNewPostSubmit}
          />
          <MyPostsContainer
            currentUser={currentUser}
            tags={tags}
            myPosts={myPosts}
            handleEditPostSubmit={this.handleEditPostSubmit}
            handleDeletePost={this.handleDeletePost}
            errors={errors.myPost}
          />
          <ArticlesContainer />
        </main>
      </div>
    );
  }
}

export default App;
