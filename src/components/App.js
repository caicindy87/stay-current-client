import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "../style/App.scss";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import About from "./About";
import NavBar from "./NavBar";
import PostsContainer from "./post/PostsContainer";
import MyPostsContainer from "../components/myPosts/MyPostsContainer";
import authApi from "../services/authApi";
import tagApi from "../services/tagApi";
import myPostApi from "../services/myPostApi";
import ArticlesContainer from "./articles/ArticlesContainer";
import PostsList from "./post/PostsList";

class App extends Component {
  state = {
    currentUser: {},
    tags: [],
    myPosts: [],
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
          console.log(currentUser.error);
        } else {
          this.setState(
            {
              currentUser: currentUser,
            },
            this.fetchMyPosts
          );
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

  fetchTags = () => {
    tagApi
      .getTags()
      .then((tags) => this.setState({ tags: tags }))
      .catch((err) => console.log(err));
  };

  fetchMyPosts = () => {
    const { currentUser } = this.state;

    myPostApi
      .getMyPosts(currentUser)
      .then((posts) => this.setState({ myPosts: posts }));
  };

  updateMyPostsOnNewPostSubmit = (newPost) => {
    this.setState({
      myPosts: [...this.state.myPosts, newPost],
    });
  };

  handleEditPostSubmit = (e, inputs, postId) => {
    const { currentUser } = this.state;

    e.preventDefault();

    myPostApi.editMyPost(inputs, currentUser, postId).then((updatedPost) => {
      this.setState((prevState) => ({
        myPosts: prevState.myPosts.map((post) =>
          post.post_info.id === updatedPost.post_info.id ? updatedPost : post
        ),
      }));
    });
  };

  handleDeletePost = (postId) => {
    const { currentUser } = this.state;

    myPostApi.deleteMyPost(currentUser, postId).then((data) => {
      this.setState((prevState) => ({
        myPosts: prevState.myPosts.filter(
          (myPost) => myPost.post_info.id !== postId
        ),
      }));
      // if (data.ok) {
      //   alert("Successfully deleted");
      // }
    });
  };

  render() {
    const { currentUser, tags, myPosts } = this.state;

    return (
      <div className="app">
        <NavBar handleLogOut={this.handleLogOut} currentUser={currentUser} />
        <main>
          <Switch>
            <Route
              path="/login"
              render={(routerProps) => {
                return (
                  <Login {...routerProps} handleLogin={this.handleLogin} />
                );
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
          </Switch>
          <PostsContainer
            currentUser={currentUser}
            tags={tags}
            fetchMyPosts={this.fetchMyPosts}
            updateMyPostsOnNewPostSubmit={this.updateMyPostsOnNewPostSubmit}
          />
          <MyPostsContainer
            currentUser={currentUser}
            tags={tags}
            myPosts={myPosts}
            handleEditPostSubmit={this.handleEditPostSubmit}
            handleDeletePost={this.handleDeletePost}
          />
          <ArticlesContainer />
        </main>
      </div>
    );
  }
}

export default App;
