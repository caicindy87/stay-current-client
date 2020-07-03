import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import postApi from "../../services/postApi";
import PostNew from "./PostNew";
import PostsList from "./PostsList";

class PostsContainer extends Component {
  state = {
    posts: [],
    errors: [],
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    const token = localStorage.getItem("token");

    postApi
      .getPosts(token)
      .then((posts) => this.setState({ posts: posts }))
      .catch((err) => console.log(err));
  };

  handlePostSubmit = (e, inputs) => {
    e.preventDefault();
    const { currentUser, history } = this.props;
    const token = localStorage.getItem("token");
    // const formData = new FormData();
    // formData.append("text", inputs.text);
    // formData.append("selectedTags", inputs.selectedTags);
    // formData.append("image", inputs.image);

    postApi.createNewPost(inputs, currentUser, token).then((post) => {
      if (post.error) {
        this.setState({ errors: post.error });
      } else {
        this.setState((prevState) => ({
          errors: [],
          posts: [...prevState.posts, post],
        }));
        this.props.updateMyPostsOnNewPostSubmit(post);
      }
    });

    history.push("/");
  };

  handleUpvoteClick = (post, upvoteClicked) => {
    const { currentUser } = this.props;
    const token = localStorage.getItem("token");

    if (upvoteClicked) {
      postApi.decreaseUpvote(post, currentUser, token).then((updatedPost) =>
        this.setState((prevState) => ({
          posts: prevState.posts.map((post) =>
            post.post_info.id === updatedPost.post_info.id ? updatedPost : post
          ),
        }))
      );
    } else {
      postApi.increaseUpvote(post, currentUser, token).then((updatedPost) =>
        this.setState((prevState) => ({
          posts: prevState.posts.map((post) =>
            post.post_info.id === updatedPost.post_info.id ? updatedPost : post
          ),
        }))
      );
    }
  };

  handleDownvoteClick = (post, downvoteClicked) => {
    const { currentUser } = this.props;
    const token = localStorage.getItem("token");

    if (downvoteClicked) {
      postApi.decreaseDownvote(post, currentUser, token).then((updatedPost) =>
        this.setState((prevState) => ({
          posts: prevState.posts.map((post) =>
            post.post_info.id === updatedPost.post_info.id ? updatedPost : post
          ),
        }))
      );
    } else {
      postApi.increaseDownvote(post, currentUser, token).then((updatedPost) => {
        this.setState((prevState) => ({
          posts: prevState.posts.map((post) =>
            post.post_info.id === updatedPost.post_info.id ? updatedPost : post
          ),
        }));
      });
    }
  };

  render() {
    const { currentUser, tags } = this.props;
    const { posts, errors } = this.state;

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
            exact
            path="/"
            render={() => {
              return (
                <PostsList
                  posts={posts}
                  currentUser={currentUser}
                  tags={tags}
                  handleUpvoteClick={this.handleUpvoteClick}
                  handleDownvoteClick={this.handleDownvoteClick}
                  handlePostSubmit={this.handlePostSubmit}
                  errors={errors}
                />
              );
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(PostsContainer);
