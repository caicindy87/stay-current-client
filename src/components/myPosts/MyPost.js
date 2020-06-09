import React, { Component } from "react";
import { Item, Image, Dropdown, Modal, Button, Label } from "semantic-ui-react";
import MyPostEditForm from "./MyPostEditForm";

class MyPost extends Component {
  state = {
    modalOpen: false,
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { post, tags, handleEditPostSubmit, handleDeletePost } = this.props;
    const { post_info } = this.props.post;
    // const selectOptions = this.props.tags.map((tag) => ({
    //   key: tag.id,
    //   text: tag.name,
    //   value: tag.id,
    // }));
    // const tagIds = post_info.tags.map((tag) => tag.id);

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
                  <Modal
                    trigger={
                      <Dropdown.Item
                        icon="edit"
                        text="Edit post"
                        onClick={this.handleOpen}
                      />
                    }
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

                  <Dropdown.Item
                    icon="trash"
                    text="Delete post"
                    onClick={() => handleDeletePost(post_info.id)}
                  />
                </Dropdown.Menu>
              </Dropdown>
              <p className="upvote-count">Upvotes: {post_info.downvotes}</p>
              <p className="downvote-count">Downvotes: {post_info.upvotes}</p>
              <Item.Header>{post_info.user.username}</Item.Header>
              <Item.Meta>Published {post.publish_date} ago</Item.Meta>
              <Item.Description>
                {post_info.text}
                {post_info.image ? (
                  <Image src={post_info.image} size="small" />
                ) : null}
              </Item.Description>
              <Item.Extra>
                <Label.Group>
                  {post_info.tags
                    ? post_info.tags.map((tag) => (
                        <Label key={tag.id} size="tiny" basic>
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
