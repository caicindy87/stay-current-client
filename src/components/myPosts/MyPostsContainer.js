import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import myPostApi from "../../services/myPostApi";
import MyPostsList from "../../components/myPosts/MyPostsList";
import "../../style/MyPostsContainer.scss";

class MyPostsContainer extends Component {
  // state = {};

  // fetchMyPosts = () => {
  //   const { currentUser } = this.props;

  //   myPostApi
  //     .getMyPosts(currentUser)
  //     .then((posts) => this.setState({ myPosts: posts }));
  // };

  render() {
    const {
      currentUser,
      tags,
      myPosts,
      handleEditPostSubmit,
      handleDeletePost,
    } = this.props;
    // const { myPosts } = this.state;

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
