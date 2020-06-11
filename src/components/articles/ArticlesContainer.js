import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import articleApi from "../../services/articleApi";
import ArticlesList from "./ArticlesList";

class ArticlesContainer extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    articleApi
      .getArticles()
      .then((data) => this.setState({ articles: data.articles }));
  };

  render() {
    const { articles } = this.state;

    return (
      <div className="articles-container">
        <Switch>
          <Route
            exact
            path="/articles"
            render={() => {
              return <ArticlesList articles={articles} />;
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default ArticlesContainer;
