import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import postApi from "../../services/postApi";
import PostNew from "./PostNew";

class PostsContainer extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    postApi
      .getPosts()
      .then((posts) =>
        this.setState({
          posts: posts,
        })
      )
      .catch((err) => console.log(err));
  };

  render() {
    const { currentUser } = this.props;

    return (
      <div>
        <Switch>
          <Route
            path={`/${currentUser.username}/posts/new`}
            component={PostNew}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default PostsContainer;
