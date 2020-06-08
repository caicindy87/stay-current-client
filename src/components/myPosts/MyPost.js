import React, { Component } from "react";
import { Item, Image, Dropdown, Modal, Button, Label } from "semantic-ui-react";
import EditMyPostForm from "./EditMyPostForm";

class MyPost extends Component {
  handleSubmit = () => {
    console.log("submitted");
  };
  render() {
    const { post, tags } = this.props;
    const { post_info } = this.props.post;
    const selectOptions = this.props.tags.map((tag) => ({
      key: tag.id,
      text: tag.name,
      value: tag.id,
    }));
    const tagIds = post_info.tags.map((tag) => tag.id);

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
                    trigger={<Dropdown.Item icon="edit" text="Edit post" />}
                  >
                    <Modal.Header content="Edit post"></Modal.Header>
                    <Modal.Content>
                      {/* <Form onSubmit={this.handleSubmit}>
                        <Form.TextArea>{post_info.text}</Form.TextArea>
                        <Form.Input>
                          {post_info.image ? post_info.image : null}
                        </Form.Input>
                        <Dropdown
                          placeholder="Add tags"
                          fluid
                          multiple
                          search
                          selection
                          defaultValue={tagIds}
                          options={selectOptions}
                          onChange={this.handleDropdownChange}
                        ></Dropdown>
                      </Form> */}
                      <EditMyPostForm post_info={post_info} tags={tags} />
                    </Modal.Content>
                    <Modal.Actions>
                      <Button>Save</Button>
                    </Modal.Actions>
                  </Modal>

                  <Dropdown.Item icon="trash" text="Delete post" />
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
                        <Label key={tag.id} size="tiny" color="yellow">
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
