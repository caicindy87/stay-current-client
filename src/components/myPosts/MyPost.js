import React, { Component } from "react";
import {
  Item,
  Image,
  Dropdown,
  Modal,
  Confirm,
  Label,
} from "semantic-ui-react";
import MyPostEditForm from "./MyPostEditForm";

class MyPost extends Component {
  state = {
    modalOpen: false,
    confirmOpen: false,
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  showConfirm = () => this.setState({ confirmOpen: true });

  handleConfirm = () => {
    const { handleDeletePost } = this.props;
    const { post_info } = this.props.post;

    handleDeletePost(post_info.id);
    this.setState({ confirmOpen: false });
  };

  handleCancelDelete = () => this.setState({ confirmOpen: false });

  urlify = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part) => {
      if (part.match(urlRegex)) {
        return (
          <a key={part} href={part} target="_blank">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  render() {
    const { post, tags, handleEditPostSubmit } = this.props;
    const { post_info } = this.props.post;
    const { confirmOpen } = this.state;

    return (
      <div className="my-post">
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              src="https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png"
            />
            <Item.Content>
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
              <Modal
                onClose={this.handleClose}
                open={this.state.modalOpen}
                closeIcon
              >
                <Modal.Header content="Edit post"></Modal.Header>
                <Modal.Content>
                  <MyPostEditForm
                    post_info={post_info}
                    tags={tags}
                    handleEditPostSubmit={handleEditPostSubmit}
                    handleClose={this.handleClose}
                  />
                </Modal.Content>
              </Modal>
              <Item.Header>{post_info.user.username}</Item.Header>
              <Item.Meta>{post.publish_date} ago</Item.Meta>
              <Item.Description>
                {this.urlify(post_info.text)}
                {post_info.image ? (
                  <Image src={post_info.image} size="large" />
                ) : null}
              </Item.Description>
              <Item.Extra>
                <Label.Group>
                  {post_info.tags
                    ? post_info.tags.map((tag) => (
                        <Label key={tag.id} size="big" basic>
                          {tag.name}
                        </Label>
                      ))
                    : null}
                </Label.Group>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }
}

export default MyPost;
