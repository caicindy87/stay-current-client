import React, { Component } from "react";

import MyPost from "./MyPost";

class MyPostsList extends Component {
  render() {
    const { posts, tags, handleEditPostSubmit, handleDeletePost } = this.props;

    return (
      <div className="my-posts-list">
        {posts.map((post) => (
          <MyPost
            key={post.post_info.id}
            post={post}
            tags={tags}
            handleEditPostSubmit={handleEditPostSubmit}
            handleDeletePost={handleDeletePost}
          />
        ))}
      </div>
    );
  }
}

export default MyPostsList;
