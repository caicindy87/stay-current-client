import React, { Component } from "react";
import { Image, Item, Icon, Label, Button } from "semantic-ui-react";

import "../../style/Post.scss";

export default class Post extends Component {
  render() {
    const { post, currentUser, handleFilterBySelectedTag } = this.props;
    const { post_info } = this.props.post;

    return (
      <div className="post">
        <Item.Group className="">
          <Item>
            <Item.Image
              size="tiny"
              src="https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png"
            />

            <Item.Content>
              {!!currentUser.id ? <></> : null}
              <Item.Header>{post_info.user.username}</Item.Header>
              <Item.Meta>Published {post.publish_date} ago</Item.Meta>
              <Item.Extra>
                <Label.Group>
                  {post_info.tags
                    ? post_info.tags.map((tag) => (
                        <Label
                          key={tag.id}
                          as="button"
                          size="tiny"
                          color="yellow"
                          onClick={handleFilterBySelectedTag}
                        >
                          {tag.name}
                        </Label>
                      ))
                    : null}
                </Label.Group>
              </Item.Extra>
              <Item.Description>
                {post_info.text}
                {post_info.image ? (
                  <Image src={post_info.image} size="small" />
                ) : null}
              </Item.Description>
            </Item.Content>
            <div>
              <button className="upvote-btn">
                <i class="far fa-thumbs-up"></i>
              </button>
              <button
                icon="thumbs down outline"
                size="huge"
                className="downvote"
              ></button>
              {/* upvote - changes color after after being clicked. if clicked
                    again, will remove upvote */}
            </div>
          </Item>
        </Item.Group>
      </div>
    );
  }
}
