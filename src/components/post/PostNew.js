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
    const { handlePostSubmit } = this.props;
    const selectOptions = this.props.tags.map((tag) => ({
      key: tag.id,
      text: tag.name,
      value: tag.id,
    }));

    return (
      <Container className="new-post-form" textAlign="center">
        <h1>Create a post</h1>
        <Form
          onSubmit={(e) =>
            handlePostSubmit(e, fields, this.clearFieldsOnSubmit)
          }
        >
          <Form.TextArea
            type="textarea"
            name="text"
            value={fields.text}
            placeholder="Share your thoughts or other resources where you learn about current events."
            onChange={this.handleInputChange}
          />
          <br />
          <Form.Input
            label="Image"
            type="text"
            name="image"
            value={fields.image}
            placeholder="Add an image (optional) - image URL "
            onChange={this.handleInputChange}
          />
          <br />
          <label>Tags</label>
          <Dropdown
            placeholder="Add tags"
            fluid
            multiple
            search
            selection
            options={selectOptions}
            onChange={this.handleDropdownChange}
          ></Dropdown>
          <br />
          <Form.Button className="create-post-btn">Create Post</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default PostNew;
