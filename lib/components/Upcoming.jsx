import React, { Component } from 'react';
import PopularMovieCard from './PopularMovieCard';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class Upcoming extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      upcoming: [],
      popular: [],
    };
  }

  componentWillMount() {
    const user = this.props.user;
    this.setState({ user });

    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US&page=1`)
    .then(response => response.json())
    .then(movies => this.setState({ upcoming: movies.results }));

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US&page=1`)
    .then(response => response.json())
    .then(movies => this.setState({ popular: movies.results }));
  }


  render() {
    return (
      <div>
      <h3 className="upcoming-header">Recent & Upcoming</h3>
      <article className="upcoming-card-container">
        <div className="upcoming-card-container-inner">
        {this.state.upcoming.map(m =>
          <PopularMovieCard movie={m} key={m.id} user={this.state.user}/>
        )}
        </div>
      </article>
      <h3 className="upcoming-header">Popular Movies</h3>
      <article className="upcoming-card-container">
        <div className="upcoming-card-container-inner">
        {this.state.popular.map(m =>
          <PopularMovieCard movie={m} key={m.id} user={this.state.user}/>
        )}
        </div>
      </article>
      </div>
    );
  }
}
