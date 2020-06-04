import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class PostNew extends Component {
  state = {
    fields: {
      text: "",
      image: "",
    },
  };

  handleChange = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };

    this.setState({
      fields: newFields,
    });
  };

  render() {
    const { fields } = this.state;
    const { handlePostSubmit } = this.props;

    return (
      <div>
        <form
          className="new-post-form"
          onSubmit={(e) => handlePostSubmit(e, fields)}
        >
          <input
            type="textarea"
            name="text"
            value={fields.text}
            placeholder="Share your thoughts or other resources to learn about current events."
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="image">Add Image (Optional)</label>
          <input
            type="text"
            name="image"
            value={fields.image}
            placeholder="Image URL"
            onChange={this.handleChange}
          />
          <br />
          <button>Create Post</button>
        </form>
      </div>
    );
  }
}

export default PostNew;
