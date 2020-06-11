import React, { Component } from "react";
import { Checkbox } from "semantic-ui-react";

import Article from "../articles/Article";
import "../../style/ArticlesList.scss";

class ArticlesList extends Component {
  render() {
    const { articles } = this.props;

    return (
      <div className="articles-wrapper">
        <div className="phrase">
          <h1>Top headlines</h1>
        </div>
        <div className="articles-list">
          {articles.map((a) => (
            <Article key={a.url} article={a} />
          ))}
        </div>
      </div>
    );
  }
}

export default ArticlesList;
