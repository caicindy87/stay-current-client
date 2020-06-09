import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import myPostApi from "../../services/myPostApi";
import MyPostsList from "../../components/myPosts/MyPostsList";
import "../../style/MyPostsContainer.scss";

class MyPostsContainer extends Component {
  state = {
    myPosts: [],
  };

  componentDidUpdate(prevState) {
    const { currentUser } = this.props;

    if (currentUser !== prevState.currentUser) {
      this.fetchMyPosts(currentUser);
    }
  }

  fetchMyPosts = () => {
    const { currentUser } = this.props;

    myPostApi
      .getMyPosts(currentUser)
      .then((posts) => this.setState({ myPosts: posts }));
  };

  handleEditPostSubmit = (e, inputs, postId) => {
    const { currentUser, history } = this.props;

    e.preventDefault();

    myPostApi.editMyPost(inputs, currentUser, postId).then((updatedPost) => {
      this.setState((prevState) => ({
        myPosts: prevState.myPosts.map((post) =>
          post.post_info.id === updatedPost.post_info.id ? updatedPost : post
        ),
      }));
    });
  };

  handleDeletePost = (postId) => {
    const { currentUser, history } = this.props;
    myPostApi.deleteMyPost(currentUser, postId).then((data) => {
      this.setState((prevState) => ({
        myPosts: prevState.myPosts.filter(
          (myPost) => myPost.post_info.id !== postId
        ),
      }));
      if (data.ok) {
        alert("Successfully deleted");
      }
    });
  };

  render() {
    const { currentUser, tags } = this.props;
    const { myPosts } = this.state;

    return (
      <div className="my-posts-container">
        <Switch>
          <Route
            path="/myposts"
            render={() => {
              return (
                <MyPostsList
                  posts={myPosts}
                  currentUser={currentUser}
                  tags={tags}
                  handleEditPostSubmit={this.handleEditPostSubmit}
                  handleDeletePost={this.handleDeletePost}
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
