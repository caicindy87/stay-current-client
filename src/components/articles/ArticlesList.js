import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Article from "../articles/Article";
import "../../style/ArticlesList.scss";

class ArticlesList extends Component {
  render() {
    const { articles, fetchMoreArticles, hasMore } = this.props;

    return (
      <div className="articles-list">
        <div className="inner-width">
          <div className="header">
            <h1>Top Stories</h1>
            <div className="underline"></div>
          </div>
          <div className="articles">
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreArticles}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {articles.map((a) => (
                <Article key={a.url} article={a} />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesList;
