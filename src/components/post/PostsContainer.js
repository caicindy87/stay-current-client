import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import postApi from "../../services/postApi";
import tagApi from "../../services/tagApi";
import PostNew from "./PostNew";
import PostsList from "./PostsList";
import "../../style/PostsContainer.scss";

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
      .then((posts) => this.setState({ posts: posts }))
      .catch((err) => console.log(err));
  };

  handlePostSubmit = (e, inputs) => {
    const { currentUser, history } = this.props;

    e.preventDefault();

    postApi.createNewPost(inputs, currentUser).then((post) => {
      this.setState((prevState) => ({
        posts: [...prevState.posts, post],
      }));
      this.props.updateMyPostsOnNewPostSubmit(post);
    });

    this.props.fetchMyPosts();
    history.push("/");
  };

  handleUpvoteClick = (post, upvoteClicked) => {
    const { currentUser } = this.props;

    if (upvoteClicked) {
      postApi.decreaseUpvote(post, currentUser).then((updatedPost) =>
        this.setState((prevState) => ({
          posts: prevState.posts.map((post) =>
            post.post_info.id === updatedPost.post_info.id ? updatedPost : post
          ),
        }))
      );
    } else {
      postApi.increaseUpvote(post, currentUser).then((updatedPost) =>
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

    if (downvoteClicked) {
      postApi.decreaseDownvote(post, currentUser).then((updatedPost) =>
        this.setState((prevState) => ({
          posts: prevState.posts.map((post) =>
            post.post_info.id === updatedPost.post_info.id ? updatedPost : post
          ),
        }))
      );
    } else {
      postApi.increaseDownvote(post, currentUser).then((updatedPost) =>
        this.setState((prevState) => ({
          posts: prevState.posts.map((post) =>
            post.post_info.id === updatedPost.post_info.id ? updatedPost : post
          ),
        }))
      );
    }
  };

  render() {
    const { currentUser, tags } = this.props;
    const { posts } = this.state;

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
