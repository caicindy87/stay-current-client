import React, { Component } from "react";
import { Item, Label, Modal, Button, Dropdown } from "semantic-ui-react";

import Post from "./Post";
import "../../style/PostsList.scss";
import PostNew from "./PostNew";
import About from "../About";

class PostsList extends Component {
  state = {
    filteredPosts: [],
    modalOpen: false,
    selectedTag: "",
  };

  handleTagSelected = (e) => {
    const tagName = e.target.innerText;

    if (this.state.selectedTag !== tagName) {
      this.setState(
        { selectedTag: tagName },
        this.handleFilterBySelectedTag(tagName)
      );
    } else {
      this.setState(
        { selectedTag: "" },
        this.handleFilterBySelectedTag("no tag selected")
      );
    }
  };

  // filter all posts by selected tag
  handleFilterBySelectedTag = (tagName) => {
    const { posts } = this.props;
    const filteredPosts = posts.filter((post) =>
      post.post_info.tags.find((tag) => tag.name === tagName)
    );

    this.setState({ filteredPosts: filteredPosts });
  };

  alphabetizeTags = () => {
    const { tags } = this.props;

    const alphabetizedTags = tags.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    return alphabetizedTags;
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
      handleUpvoteClick,
      handleDownvoteClick,
      postSubmit,
    } = this.props;
    const selectOptions = this.props.tags.map((tag) => ({
      key: tag.id,
      text: tag.name,
      value: tag.id,
    }));

    return (
      <div className="posts-list">
        <div className="inner-width">
          <Modal
            onClose={this.handleClose}
            open={this.state.modalOpen}
            closeIcon
          >
            <Modal.Header>Create a post</Modal.Header>
            <Modal.Content>
              <PostNew
                tags={this.alphabetizeTags()}
                postSubmit={postSubmit}
                handleClose={this.handleClose}
              />
            </Modal.Content>
          </Modal>

          <div className="posts">
            {!!localStorage.getItem("token") ? (
              <div className="new-post">
                <input
                  type="textarea"
                  placeholder="What news is on your mind?"
                  onClick={this.handleOpen}
                  readOnly
                ></input>
                <Button className="submit-post" onClick={this.handleOpen}>
                  Post
                </Button>
              </div>
            ) : (
              <About />
            )}
            <div className="tags-dropdown">
              <Dropdown
                label="Tags"
                placeholder="Tags"
                fluid
                clearable
                search
                selection
                options={selectOptions}
                onChange={this.handleTagSelected}
              ></Dropdown>
            </div>
            <div className="container">
              {this.sortPostsFromMostToLeastUpvotes().map((post) => {
                return (
                  <Post
                    key={post.post_info.id}
                    post={post}
                    currentUser={currentUser}
                    handleTagSelected={this.handleTagSelected}
                    handleUpvoteClick={handleUpvoteClick}
                    handleDownvoteClick={handleDownvoteClick}
                  />
                );
              })}
            </div>
          </div>
          <div className="tags-container">
            <Label.Group size="big">
              {this.alphabetizeTags().map((tag) => {
                return (
                  <Label
                    key={tag.id}
                    as="button"
                    basic
                    onClick={this.handleTagSelected}
                  >
                    {tag.name}
                  </Label>
                );
              })}
            </Label.Group>
          </div>
        </div>
      </div>
    );
  }
}

export default PostsList;
