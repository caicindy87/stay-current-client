import React, { Component } from "react";
import { Container, Form } from "semantic-ui-react";

import "../../style/PostNew.scss";

class PostNew extends Component {
  state = {
    fields: {
      text: "",
      image: null,
      selectedTags: [],
    },
  };

  handleInputChange = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };

    this.setState({
      fields: newFields,
    });
  };

  onImageChange = (e) => {
    const image = e.target.files[0];

    this.setState({ fields: { ...this.state.fields, image: image } });
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
            handlePostSubmit(e, this.state.fields);
            handleClose();
          }}
        >
          <Form.TextArea
            type="textarea"
            name="text"
            value={fields.text}
            placeholder="What's happening?"
            onChange={this.handleInputChange}
          />
          <br />
          <Form.Input
            label="Image (Optional)"
            type="file"
            name="image"
            accept="image/*"
            multiple={false}
            onChange={this.onImageChange}
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
