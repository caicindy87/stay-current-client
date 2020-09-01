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
  };

  componentDidMount() {
    this.checkLoginStatus();
    this.fetchTags();
  }

  checkLoginStatus = () => {
    const token = localStorage.getItem("token");

    if (token) {
      authApi.auth.getCurrentUser().then((currentUser) => {
        this.setState(
          { currentUser: currentUser },
          this.fetchMyPosts(currentUser)
        );
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
      .then((posts) => this.setState({ myPosts: posts }))
      .catch((err) => console.log(err));
  };

  // updates user's posts without reload when user submits a new post
  updateMyPostsOnNewPostSubmit = (newPost) => {
    this.setState({
      myPosts: [...this.state.myPosts, newPost],
    });
  };

  postEditSubmit = (e, inputs, postId) => {
    e.preventDefault();
    const { currentUser } = this.state;
    const token = localStorage.getItem("token");

    const editFormData = new FormData();
    editFormData.append("text", inputs.text);
    editFormData.append("selectedTags", inputs.selectedTags);

    // If upload new image, append the image. If no new image (keep the current image), append image's signed_id
    if (inputs.image) {
      inputs.image.signed_id
        ? editFormData.append("image", inputs.image.signed_id)
        : editFormData.append("image", inputs.image);
    }

    myPostApi
      .editMyPost(editFormData, currentUser, postId, token)
      .then((updatedPost) => {
        this.setState((prevState) => ({
          myPosts: prevState.myPosts.map((post) =>
            post.post_info.id === updatedPost.post_info.id ? updatedPost : post
          ),
        }));
      })
      .catch((err) => console.log(err));
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
    const { currentUser, tags, myPosts } = this.state;

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
            postEditSubmit={this.postEditSubmit}
            handleDeletePost={this.handleDeletePost}
          />
          <ArticlesContainer />
        </main>
      </div>
    );
  }
}

export default App;
