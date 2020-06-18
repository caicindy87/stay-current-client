import React, { Component } from "react";
import { Container, Form, Dropdown } from "semantic-ui-react";

import "../../style/PostNew.scss";

class PostNew extends Component {
  state = {
    fields: {
      text: "",
      image: "",
      selectedTags: [],
    },
  };

  handleInputChange = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };

    this.setState({
      fields: newFields,
    });
  };

  handleDropdownChange = (e, { value }) => {
    this.setState((prevState) => ({
      fields: {
        ...prevState.fields,
        selectedTags: value,
      },
    }));
  };

  render() {
    const { fields } = this.state;
    const { handlePostSubmit, handleClose } = this.props;
    const selectOptions = this.props.tags.map((tag) => ({
      key: tag.id,
      text: tag.name,
      value: tag.id,
    }));

    return (
      <Container className="new-post-form" textAlign="center">
        <Form
          onSubmit={(e) => {
            handlePostSubmit(e, fields);
            handleClose();
          }}
        >
          <Form.TextArea
            type="textarea"
            name="text"
            value={fields.text}
            placeholder="Share current events"
            onChange={this.handleInputChange}
          />
          <br />
          <Form.Input
            label="Image (Optional)"
            type="text"
            name="image"
            value={fields.image}
            placeholder="Add an image URL "
            onChange={this.handleInputChange}
          />
          <br />
          <Form.Dropdown
            label="Tags (Optional)"
            placeholder="Add tags"
            fluid
            multiple
            search
            selection
            options={selectOptions}
            onChange={this.handleDropdownChange}
          ></Form.Dropdown>
          <br />
          <Form.Button className="create-post-btn">Create Post</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default PostNew;
