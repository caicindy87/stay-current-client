import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import MyPostsList from "../../components/myPosts/MyPostsList";
import "../../style/MyPostsContainer.scss";

class MyPostsContainer extends Component {
  render() {
    const {
      currentUser,
      tags,
      myPosts,
      handleEditPostSubmit,
      handleDeletePost,
    } = this.props;

    return (
      <div className="my-posts-container">
        <Switch>
          <Route
            path="/mypage"
            render={() => {
              return (
                <MyPostsList
                  posts={myPosts}
                  currentUser={currentUser}
                  tags={tags}
                  handleEditPostSubmit={handleEditPostSubmit}
                  handleDeletePost={handleDeletePost}
                />
              );
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(MyPostsContainer);
