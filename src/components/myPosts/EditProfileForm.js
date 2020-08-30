import React, { Component } from "react";
import { Form, Image } from "semantic-ui-react";

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

        <Form.Field
          type="text"
          name="text"
          value={currentUser.bio}
          onChange={this.handleInputChange}
        >
          <label>Bio</label>
          <input></input>
        </Form.Field>
      </Form>
    );
  }
}

export default EditProfileForm;
