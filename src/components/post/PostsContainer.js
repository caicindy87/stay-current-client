import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

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

  // when submit a post, have to create post and post-tag(s)

  handlePostSubmit = (e, inputs, clearFieldsOnSubmit) => {
    const { currentUser } = this.props;

    e.preventDefault();

    postApi.createNewPost(inputs, currentUser).then((post) =>
      this.setState((prevState) => ({
        posts: [...prevState.posts, post],
      }))
    );

    clearFieldsOnSubmit();
  };

  render() {
    const { currentUser } = this.props;
    const { tags } = this.state;

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
                  tags={tags}
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
