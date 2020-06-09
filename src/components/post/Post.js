import React, { Component } from "react";
import { Image, Item, Label } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpReg,
  faThumbsDown as faThumbsDownReg,
} from "@fortawesome/free-regular-svg-icons";

import "../../style/Post.scss";

export default class Post extends Component {
  state = {
    upvoteClicked: false,
    downvoteClicked: false,
  };

  handleSetStateOnUpvoteClick = () => {
    const { post, handleUpvoteClick } = this.props;
    const { upvoteClicked } = this.state;

    this.setState((prevState) => ({
      upvoteClicked: !prevState.upvoteClicked,
      downvoteClicked: false,
    }));

    handleUpvoteClick(post.post_info, upvoteClicked);
  };

  handleSetStateOnDownvoteClick = () => {
    const { post, handleDownvoteClick } = this.props;
    const { downvoteClicked } = this.state;

    this.setState((prevState) => ({
      upvoteClicked: false,
      downvoteClicked: !prevState.downvoteClicked,
    }));

    handleDownvoteClick(post.post_info, downvoteClicked);
  };

  render() {
    const { post, currentUser, handleFilterBySelectedTag } = this.props;
    const { post_info } = this.props.post;
    const { upvoteClicked, downvoteClicked } = this.state;

    return (
      <div className="post">
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              src="https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png"
            />
            <Item.Content>
              <div className="downvote-btn-container">
                <button
                  className="downvote-btn"
                  onClick={this.handleSetStateOnDownvoteClick}
                  disabled={!!currentUser.id ? upvoteClicked : true}
                >
                  <FontAwesomeIcon
                    icon={downvoteClicked ? faThumbsDown : faThumbsDownReg}
                  />
                </button>
                <p className="upvote-count">{post_info.downvotes}</p>
              </div>
              <div className="upvote-btn-container">
                <button
                  className="upvote-btn"
                  onClick={this.handleSetStateOnUpvoteClick}
                  disabled={!!currentUser.id ? downvoteClicked : true}
                >
                  <FontAwesomeIcon
                    icon={upvoteClicked ? faThumbsUp : faThumbsUpReg}
                  />
                </button>
                <p className="downvote-count">{post_info.upvotes}</p>
              </div>
              <Item.Header>{post_info.user.username}</Item.Header>
              <Item.Meta>Published {post.publish_date} ago</Item.Meta>

              <Item.Description>
                {post_info.text}
                {post_info.image ? (
                  <Image src={post_info.image} size="small" />
                ) : null}
              </Item.Description>
              <Item.Extra>
                <Label.Group>
                  {post_info.tags
                    ? post_info.tags.map((tag) => (
                        <Label
                          key={tag.id}
                          as="button"
                          size="tiny"
                          basic
                          onClick={handleFilterBySelectedTag}
                        >
                          {tag.name}
                        </Label>
                      ))
                    : null}
                </Label.Group>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }
}
