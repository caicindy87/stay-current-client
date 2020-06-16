import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import articleApi from "../../services/articleApi";
import ArticlesList from "./ArticlesList";

class ArticlesContainer extends Component {
  state = {
    articles: [],
    page: 1,
    hasMore: true,
    totalResults: 0,
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    const { page } = this.state;

    return articleApi.getArticles(page).then((data) =>
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
      })
    );
  };

  fetchMoreArticles = () => {
    this.checkForEndOfTotalResults();

    if (this.state.hasMore) {
      this.setState({ page: this.state.page + 1 }, () => {
        console.log("new page", this.state.page);
        articleApi.getArticles(this.state.page).then((data) => {
          console.log(data.articles);
          const moreArticles = [...this.state.articles, ...data.articles];
          console.log("fetched", moreArticles);
          this.setState({ articles: moreArticles });
        });
      });
    }
  };

  checkForEndOfTotalResults = () => {
    const { totalResults, articles } = this.state;

    if (articles.length === totalResults) {
      this.setState({ hasMore: false });
    }
  };

  render() {
    const { articles, hasMore } = this.state;

    return (
      <div className="articles-container">
        <Switch>
          <Route
            exact
            path="/news"
            render={() => {
              return (
                <ArticlesList
                  articles={articles}
                  fetchMoreArticles={this.fetchMoreArticles}
                  hasMore={hasMore}
                />
              );
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default ArticlesContainer;
