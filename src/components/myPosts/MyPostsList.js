import React, { Component } from "react";

import MyPost from "./MyPost";
import "../../style/PostsList.scss";
import "../../style/MyPostsList.scss";

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
      postEditSubmit,
      handleDeletePost,
      currentUser,
      errors,
    } = this.props;

    return (
      <div className="posts-list">
        <div className="inner-width">
          <div className="profile">
            <img src={currentUser.profile_pic} className="profile-pic" alt="" />
            <p className="username">{currentUser.username}</p>

            <p className="bio">{currentUser.bio}</p>
          </div>
          <div className="posts">
            {this.sortPostsFromNewestToOldest().map((post) => (
              <MyPost
                key={post.post_info.id}
                post={post}
                tags={tags}
                postEditSubmit={postEditSubmit}
                handleDeletePost={handleDeletePost}
                errors={errors}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MyPostsList;
