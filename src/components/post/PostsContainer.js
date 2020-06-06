import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import postApi from "../../services/postApi";
import tagApi from "../../services/tagApi";
import PostNew from "./PostNew";
import PostsList from "./PostsList";

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

  handlePostSubmit = (e, inputs, clearFieldsOnSubmit) => {
    const { currentUser } = this.props;

    e.preventDefault();

    postApi.createNewPost(inputs, currentUser).then((post) =>
      this.setState((prevState) => ({
        posts: [...prevState.posts, post],
      }))
    );

    // instead of clearing the fields, just redirect to /posts
    clearFieldsOnSubmit();
  };

  render() {
    const { currentUser } = this.props;
    const { tags, posts } = this.state;

    return (
      <div className="posts-container">
        <Switch>
          <Route
            path={`/${currentUser.username}/posts/new`}
            render={() => {
              return (
                <PostNew
                  currentUser={currentUser}
                  handlePostSubmit={this.handlePostSubmit}
                  tags={tags}
                />
              );
            }}
          ></Route>
          <Route
            path="/"
            render={() => {
              return <PostsList posts={posts} currentUser={currentUser} />;
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default PostsContainer;
