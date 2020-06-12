import React, { Component } from "react";
import { Item, Label, Modal } from "semantic-ui-react";

import Post from "./Post";
import "../../style/PostsList.scss";
import PostNew from "./PostNew";
import About from "../About";

class PostsList extends Component {
  state = {
    filteredPosts: [],
    modalOpen: false,
  };

  handleFilterBySelectedTag = (e) => {
    const { posts } = this.props;
    const filteredPosts = posts.filter((post) =>
      post.post_info.tags.find((tag) => tag.name === e.target.innerText)
    );

    this.setState({ filteredPosts: filteredPosts });
  };

  sortPostsFromMostToLeastUpvotes = () => {
    let posts = [];
    if (this.state.filteredPosts.length === 0) {
      posts = this.props.posts;
    } else {
      posts = this.state.filteredPosts;
    }

    return posts.sort((a, b) => b.post_info.upvotes - a.post_info.upvotes);
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const {
      currentUser,
      tags,
      handleUpvoteClick,
      handleDownvoteClick,
      handlePostSubmit,
    } = this.props;

    return (
      <div className="container">
        <Modal onClose={this.handleClose} open={this.state.modalOpen} closeIcon>
          <Modal.Header>Create a post</Modal.Header>
          <Modal.Content>
            <PostNew
              tags={tags}
              handlePostSubmit={handlePostSubmit}
              handleClose={this.handleClose}
            />
          </Modal.Content>
        </Modal>

        <div className="posts-list">
          {!!currentUser.id ? (
            <div className="new-post">
              <input
                type="textarea"
                value=""
                placeholder="What news is on your mind?"
                onClick={this.handleOpen}
              ></input>
            </div>
          ) : (
            <About />
          )}
          <Item.Group>
            {this.sortPostsFromMostToLeastUpvotes().map((post) => {
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
