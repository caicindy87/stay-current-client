import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import postApi from "../../services/postApi";
import tagApi from "../../services/tagApi";
import PostNew from "./PostNew";

class PostsContainer extends Component {
  state = {
    posts: [],
    tags: [],
  };

  componentDidMount() {
    this.fetchPosts();
    this.fetchTags();
  }

  fetchPosts = () => {
    postApi
      .getPosts()
      .then((posts) => this.setState({ posts: posts }))
      .catch((err) => console.log(err));
  };

  fetchTags = () => {
    tagApi
      .getTags()
      .then((tags) => this.setState({ tags: tags }))
      .catch((err) => console.log(err));
  };

  handlePostSubmit = (e, inputs) => {
    const { currentUser } = this.props;

    e.preventDefault();

    postApi.createNewPost(inputs, currentUser).then((post) =>
      this.setState((prevState) => ({
        posts: [...prevState.posts, post],
      }))
    );
  };

  render() {
    const { currentUser } = this.props;

    return (
      <div>
        <Switch>
          <Route
            path={`/${currentUser.username}/posts/new`}
            render={() => {
              return (
                <PostNew
                  currentUser={currentUser}
                  handlePostSubmit={this.handlePostSubmit}
                />
              );
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default PostsContainer;
