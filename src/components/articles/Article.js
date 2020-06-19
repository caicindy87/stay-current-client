import React, { Component } from "react";

class Article extends Component {
  render() {
    const { article } = this.props;

    return (
      <div className="article-card">
        <div className="image">
          <img src={article.urlToImage} alt=""></img>
        </div>
        <div className="article-content">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <h2 className="title">{article.title}</h2>
          </a>
          <p className="source">{article.source.name}</p>
          <p className="description">{article.description}</p>
        </div>
      </div>
    );
  }
}

export default Article;
