import React, { Component } from "react";
import { Form, Dropdown } from "semantic-ui-react";

class MyPostEditForm extends Component {
  state = {
    fields: {
      text: "",
      image: "",
      selectedTags: [],
    },
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
    const { handleEditPostSubmit, post_info, tags, handleClose } = this.props;
    const selectOptions = tags.map((tag) => ({
      key: tag.id,
      text: tag.name,
      value: tag.id,
    }));
    const tagIds = post_info.tags.map((tag) => tag.id);

    return (
      <div className="edit-my-post-form">
        <Form
          onSubmit={(e) => {
            handleEditPostSubmit(e, fields, post_info.id);
            handleClose();
          }}
        >
          <Form.TextArea
            type="textarea"
            name="text"
            value={fields.text}
            placeholder="Share your thoughts or other resources where you learn about current events."
            onChange={this.handleInputChange}
          />
          <Form.Input
            type="text"
            name="image"
            label="Image"
            value={fields.image === "" ? "No image" : fields.image}
            placeholder="Edit image url"
            onChange={this.handleInputChange}
          />
          <Dropdown
            placeholder="Edit tags"
            fluid
            multiple
            search
            selection
            defaultValue={
              fields.selectedTags.length === 0 ? tagIds : fields.selectedTags
            }
            options={selectOptions}
            onChange={this.handleDropdownChange}
          ></Dropdown>
          <br />
          <Form.Button className="save-edit-post-btn">Save changes</Form.Button>
        </Form>
      </div>
    );
  }
}

export default MyPostEditForm;
