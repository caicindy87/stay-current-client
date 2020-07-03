import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import MyPostsList from "../../components/myPosts/MyPostsList";
import "../../style/MyPostsContainer.scss";

class MyPostsContainer extends Component {
  render() {
    const {
      currentUser,
      tags,
      myPosts,
      postEditSubmit,
      handleDeletePost,
      errors,
    } = this.props;

    return (
      <div className="my-posts-container">
        <Switch>
          <Route
            exact
            path="/profile"
            render={() => {
              return (
                <MyPostsList
                  posts={myPosts}
                  currentUser={currentUser}
                  tags={tags}
                  postEditSubmit={postEditSubmit}
                  handleDeletePost={handleDeletePost}
                  errors={errors}
                />
              );
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default MyPostsContainer;
