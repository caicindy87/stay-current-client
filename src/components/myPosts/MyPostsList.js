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
    const {
      tags,
      handleEditPostSubmit,
      handleDeletePost,
      currentUser,
    } = this.props;

    return (
      <div className="myposts-container">
        <h2>Posts</h2>
        <div className="profile-container">
          <h1>{currentUser.username}</h1>
          <img src={currentUser.profile_pic} className="profile-pic" />
          <p className="bio">{currentUser.bio}</p>
        </div>
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
      </div>
    );
  }
}

export default MyPostsList;
