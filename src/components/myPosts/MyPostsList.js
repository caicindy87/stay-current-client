import React, { Component } from "react";

import MyPost from "./MyPost";

class MyPostsList extends Component {
  render() {
    const { posts, tags } = this.props;

    return (
      <div className="my-posts-list">
        {posts.map((post) => (
          <MyPost post={post} tags={tags} />
        ))}
      </div>
    );
  }
}

export default MyPostsList;
