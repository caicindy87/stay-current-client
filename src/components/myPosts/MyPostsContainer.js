import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import postApi from "../../services/postApi";
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

    postApi
      .getMyPosts(currentUser)
      .then((posts) => this.setState({ myPosts: posts }));
  };

  render() {
    const { currentUser } = this.props;
    const { myPosts } = this.state;

    return (
      <div className="my-posts-container">
        <Switch>
          <Route
            path="/myposts"
            render={() => {
              return <MyPostsList posts={myPosts} currentUser={currentUser} />;
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default MyPostsContainer;
