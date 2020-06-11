import React, { Component } from "react";
import { Item, Label } from "semantic-ui-react";

import Post from "./Post";
import "../../style/PostsList.scss";
import PostNew from "./PostNew";
import About from "../About";

class PostsList extends Component {
  state = {
    filteredPosts: [],
  };

  handleFilterBySelectedTag = (e) => {
    const { posts } = this.props;
    const filteredPosts = posts.filter((post) =>
      post.post_info.tags.find((tag) => tag.name === e.target.innerText)
    );

    this.setState({ filteredPosts: filteredPosts });
  };

  render() {
    const {
      currentUser,
      tags,
      handleUpvoteClick,
      handleDownvoteClick,
    } = this.props;

    let posts = [];
    if (this.state.filteredPosts.length === 0) {
      posts = this.props.posts;
    } else {
      posts = this.state.filteredPosts;
    }

    const sortedPostsFromMostToLeastUpvotes = posts.sort(
      (a, b) => b.post_info.upvotes - a.post_info.upvotes
    );

    return (
      <div className="container">
        {/* <PostNew /> move the post form to posts instead of having a separate page */}
        <div className="posts-list">
          <About />
          <Item.Group>
            {sortedPostsFromMostToLeastUpvotes.map((post) => {
              return (
                <Post
                  key={post.post_info.id}
                  post={post}
                  currentUser={currentUser}
                  handleFilterBySelectedTag={this.handleFilterBySelectedTag}
                  handleUpvoteClick={handleUpvoteClick}
                  handleDownvoteClick={handleDownvoteClick}
                />
              );
            })}
          </Item.Group>
        </div>
        <div className="tags-container">
          <Label.Group size="big">
            {tags.map((tag) => {
              return (
                <Label
                  key={tag.id}
                  as="button"
                  basic
                  onClick={this.handleFilterBySelectedTag}
                >
                  {tag.name}
                </Label>
              );
            })}
          </Label.Group>
        </div>
      </div>
    );
  }
}

export default PostsList;
