import React, { Component } from "react";

import MyPost from "./MyPost";

class MyPostsList extends Component {
  render() {
    const { posts, tags, handleEditPostSubmit, handleDeletePost } = this.props;
    const postsClone = [...posts];
    const postsSortedFromNewestToOldest = postsClone.sort((a, b) => {
      if (b.post_info.created_at < a.post_info.created_at) {
        return -1;
      }
      if (b.post_info.created_at > a.post_info.created_at) {
        return 1;
      }
    });

    return (
      <div className="my-posts-list">
        {postsSortedFromNewestToOldest.map((post) => (
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
