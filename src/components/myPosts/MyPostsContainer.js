import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

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

    postApi
      .getMyPosts(currentUser)
      .then((posts) => this.setState({ myPosts: posts }));
  };

  handleEditPostSubmit = (e, inputs) => {
    const { currentUser, history } = this.props;

    e.preventDefault();

    postApi.createNewPost(inputs, currentUser).then((post) =>
      this.setState((prevState) => ({
        posts: [...prevState.posts, post],
      }))
    );

    history.push("/");
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
