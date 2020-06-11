import React, { Component } from "react";

import MyPost from "./MyPost";

class MyPostsList extends Component {
  sortPostsFromNewestToOldest = () => {
    const postsClone = [...this.props.posts];

    return postsClone.sort((a, b) => {
      if (b.post_info.created_at < a.post_info.created_at) {
        return -1;
      }
      if (b.post_info.created_at > a.post_info.created_at) {
        return 1;
      }
    });
  };

  render() {
    const { tags, handleEditPostSubmit, handleDeletePost } = this.props;

    return (
      <div className="my-posts-list">
        {this.sortPostsFromNewestToOldest().map((post) => (
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
