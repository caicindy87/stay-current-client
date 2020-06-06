import React, { Component } from "react";
import { Item } from "semantic-ui-react";

import Post from "./Post";
import "../../style/PostsList.scss";

class PostsList extends Component {
  render() {
    const { posts, currentUser } = this.props;

    return (
      <div className="posts-list">
        <div className="filter-bar">Bar for filters</div>
        <Item.Group>
          {posts.map((post) => {
            return <Post key={post.id} post={post} currentUser={currentUser} />;
          })}
        </Item.Group>
      </div>
    );
  }
}

export default PostsList;
