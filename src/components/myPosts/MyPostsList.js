import React, { Component } from "react";

import MyPost from "./MyPost";

class MyPostsList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="my-posts-list">
        {posts.map((post) => (
          <MyPost post={post} />
        ))}
      </div>
    );
  }
}

export default MyPostsList;
