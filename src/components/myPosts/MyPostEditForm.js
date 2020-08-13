import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class MyPostEditForm extends Component {
  state = {
    fields: {
      text: "",
      image: null,
      selectedTags: [],
    },
    error: false,
  };

  componentDidMount() {
    const { post_info } = this.props;
    const tagIds = post_info.tags.map((tag) => tag.id);

    this.setState({
      fields: {
        text: post_info.text,
        image: post_info.image,
        selectedTags: tagIds,
      },
    });
  }

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

  handleSubmit = (e) => {
    const { post_info, postEditSubmit, handleClose } = this.props;
    const { fields } = this.state;

    // checks if text input is only empty string and/or whitespaces before submitting
    if (!/^\s*$/.test(fields.text)) {
      postEditSubmit(e, fields, post_info.id);
      handleClose();
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { fields, error } = this.state;
    const { post_info, tags } = this.props;
    const selectOptions = tags.map((tag) => ({
      key: tag.id,
      text: tag.name,
      value: tag.id,
    }));
    const tagIds = post_info.tags.map((tag) => tag.id);

    return (
      <div className="edit-my-post-form">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <ul className="error-msg-container">
            {error ? <li className="error-msg">Text can't be blank</li> : null}
          </ul>
          <Form.TextArea
            type="textarea"
            name="text"
            value={fields.text}
            placeholder="What's happening?"
            onChange={this.handleInputChange}
          />
          <Form.Input
            type="file"
            name="image"
            label="Replace image (optional)"
            accept="image/*"
            multiple={false}
            onChange={this.onImageChange}
          />
          <Form.Dropdown
            label="Tags"
            placeholder="Edit tags (optional)"
            fluid
            multiple
            search
            selection
            defaultValue={
              fields.selectedTags.length === 0 ? tagIds : fields.selectedTags
            }
            options={selectOptions}
            onChange={this.handleDropdownChange}
          />
          <br />
          <Form.Button className="save-edit-post-btn">Save changes</Form.Button>
        </Form>
      </div>
    );
  }
}

export default MyPostEditForm;
