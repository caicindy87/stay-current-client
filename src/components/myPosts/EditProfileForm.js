import React, { Component } from "react";
import { Form } from "semantic-ui-react";

import "../../style/EditProfileForm.scss";

class EditProfileForm extends Component {
  state = {};

  render() {
    const { currentUser } = this.props;

    return (
      <Form>
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
          type="text"
          name="text"
          label="Bio"
          value={currentUser.bio}
          onChange={this.handleInputChange}
        ></Form.TextArea>
        <Form.Button className="save-edit-post-btn">Save changes</Form.Button>
      </Form>
    );
  }
}

export default EditProfileForm;
