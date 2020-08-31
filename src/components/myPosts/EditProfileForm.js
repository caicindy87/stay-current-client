import React, { Component } from "react";
import { Form } from "semantic-ui-react";

import "../../style/EditProfileForm.scss";
import profileApi from "../../services/profileApi";

class EditProfileForm extends Component {
  state = {
    fields: {
      text: "",
      image: null,
    },
  };

  componentDidMount() {
    const { currentUser } = this.props;

    this.setState({
      fields: {
        text: currentUser.bio,
        image: currentUser.profile_pic,
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

  createFormData = () => {
    const { fields } = this.state;
    const formData = new FormData();
    formData.append("text", fields.text);

    // If upload new image, append the image. If no new image (keep the current image), append image's signed_id
    if (fields.image) {
      fields.image.signed_id
        ? formData.append("image", fields.image.signed_id)
        : formData.append("image", fields.image);
    }

    return formData;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { currentUser } = this.props;
    const token = localStorage.getItem("token");
    const data = this.createFormData();

    profileApi.editProfile(data, currentUser, token);
  };

  render() {
    const { currentUser } = this.props;
    const { fields } = this.state;

    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <Form.Group className="avatar-section">
          <img src={currentUser.profile_pic} className="profile-pic" alt="" />
          <Form.Input
            type="file"
            name="image"
            label="Profile Picture"
            accept="image/*"
            multiple={false}
            onChange={this.onImageChange}
          ></Form.Input>
        </Form.Group>
        <Form.TextArea
          className="bio"
          type="textarea"
          name="text"
          label="Bio"
          value={fields.text}
          onChange={this.handleInputChange}
        ></Form.TextArea>
        <Form.Button className="save-edit-post-btn">Save changes</Form.Button>
      </Form>
    );
  }
}

export default EditProfileForm;
