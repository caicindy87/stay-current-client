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

  urlify = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part) => {
      if (part.match(urlRegex)) {
        return (
          <a key={part} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  render() {
    const { post, handleTagSelected } = this.props;
    const { post_info } = this.props.post;
    const { upvoteClicked, downvoteClicked } = this.state;

    return (
      <div className="post">
        <Item.Group>
          <Item>
            <Item.Image size="tiny" src={post_info.user.profile_pic} />
            <Item.Content>
              <Item.Header>{post_info.user.username}</Item.Header>
              <Item.Meta>{post.publish_date} ago</Item.Meta>
              <Item.Description>{this.urlify(post_info.text)}</Item.Description>
              {post_info.image ? (
                <Image src={post_info.image.url} size="large" alt="" />
              ) : null}
              <Item.Extra>
                <Label.Group>
                  {post_info.tags
                    ? post_info.tags.map((tag) => (
                        <Label
                          key={tag.id}
                          as="button"
                          size="big"
                          basic
                          onClick={handleTagSelected}
                        >
                          {tag.name}
                        </Label>
                      ))
                    : null}
                </Label.Group>
              </Item.Extra>
              <div className="vote-btn-container">
                <button
                  className="upvote-btn"
                  onClick={this.handleSetStateOnUpvoteClick}
                  disabled={
                    !!localStorage.getItem("token") ? downvoteClicked : true
                  }
                >
                  <FontAwesomeIcon
                    icon={upvoteClicked ? faThumbsUp : faThumbsUpReg}
                  />
                </button>
                <p className="downvote-count">{post_info.upvotes}</p>
              </div>
              <div className="vote-btn-container">
                <button
                  className="downvote-btn"
                  onClick={this.handleSetStateOnDownvoteClick}
                  disabled={
                    !!localStorage.getItem("token") ? upvoteClicked : true
                  }
                >
                  <FontAwesomeIcon
                    icon={downvoteClicked ? faThumbsDown : faThumbsDownReg}
                  />
                </button>
                <p className="upvote-count">{post_info.downvotes}</p>
              </div>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }
}
