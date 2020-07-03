import React, { Component } from "react";

import MyPost from "./MyPost";

class MyPostsList extends Component {
  sortPostsFromNewestToOldest = () => {
    const postsClone = [...this.props.posts];

    return postsClone.sort((a, b) => {
      if (b.post_info.created_at < a.post_info.created_at) {
        return -1;
      } else if (b.post_info.created_at > a.post_info.created_at) {
        return 1;
      }
      return 0;
    });
  };

  render() {
    const {
      tags,
      handleEditPostSubmit,
      handleDeletePost,
      currentUser,
      errors,
    } = this.props;

    return (
      <div className="myposts-container">
        <div className="profile-container">
          <h1>{currentUser.username}</h1>
          <img src={currentUser.profile_pic} className="profile-pic" alt="" />
          <p className="bio">{currentUser.bio}</p>
        </div>
        <div className="my-posts-list">
          <h2>Past Posts</h2>
          {this.sortPostsFromNewestToOldest().map((post) => (
            <MyPost
              key={post.post_info.id}
              post={post}
              tags={tags}
              handleEditPostSubmit={handleEditPostSubmit}
              handleDeletePost={handleDeletePost}
              errors={errors}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MyPostsList;
