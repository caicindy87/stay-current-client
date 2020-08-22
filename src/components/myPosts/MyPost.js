import React, { Component } from "react";
import { Dropdown, Modal, Confirm, Label } from "semantic-ui-react";
import MyPostEditForm from "./MyPostEditForm";
import "../../style/Post.scss";
import "../../style/MyPost.scss";

class MyPost extends Component {
  state = {
    modalOpen: false,
    confirmOpen: false,
  };

  // method to handle modal
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  // methods to handle delete confirmation
  showConfirm = () => this.setState({ confirmOpen: true });

  handleConfirm = () => {
    const { handleDeletePost } = this.props;
    const { post_info } = this.props.post;

    handleDeletePost(post_info.id);
    this.setState({ confirmOpen: false });
  };

  handleCancelDelete = () => this.setState({ confirmOpen: false });

  // detect link in text of post and convert from string to clickable url
  urlify = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part) => {
      if (part.match(urlRegex)) {
        return (
          <a key={part} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  render() {
    const { post, tags, postEditSubmit } = this.props;
    const { post_info } = this.props.post;
    const { confirmOpen } = this.state;

    return (
      <div className="post">
        <img src={post_info.user.profile_pic} className="avatar" alt="" />

        <Modal onClose={this.handleClose} open={this.state.modalOpen} closeIcon>
          <Modal.Header content="Edit post"></Modal.Header>
          <Modal.Content>
            <MyPostEditForm
              post_info={post_info}
              tags={tags}
              postEditSubmit={postEditSubmit}
              handleClose={this.handleClose}
            />
          </Modal.Content>
        </Modal>

        <div className="section">
          <div className="top-section">
            <div className="info mypost-info">
              <span className="username">{post_info.user.username}</span>
              <span>{post.publish_date} ago</span>
            </div>
            <div className="options">
              <Dropdown className="options-button" icon="ellipsis horizontal">
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="edit"
                    text="Edit post"
                    onClick={this.handleOpen}
                  />
                  <Dropdown.Item
                    icon="trash"
                    text="Delete post"
                    onClick={this.showConfirm}
                  />
                  <Confirm
                    open={confirmOpen}
                    header="Delete Post?"
                    content="Are you sure you want to delete this post?"
                    cancelButton="Cancel"
                    confirmButton="Delete"
                    onCancel={this.handleCancelDelete}
                    onConfirm={this.handleConfirm}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="content">
            <p className="text">{this.urlify(post_info.text)}</p>
            {post_info.image ? (
              <img src={post_info.image.url} alt="" className="post-img" />
            ) : null}
            <div className="tags">
              {post_info.tags
                ? post_info.tags.map((tag) => (
                    <Label
                      key={tag.id}
                      as="button"
                      size="big"
                      basic
                      className="mypost-tags"
                    >
                      {tag.name}
                    </Label>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPost;
