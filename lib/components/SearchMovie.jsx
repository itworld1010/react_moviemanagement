import React, { Component } from 'react';
import MovieCard from './MovieCard'
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class SearchMovie extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movieResults: [],
      userSearch: '',
    };
  }

  componentDidMount() {
    const user = this.props.user;
    this.setState({ user });
  }

  retrieveMovieSearch(input) {
    const updatedTitle = input.replace('', '+');
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=1500d38f789b9c7a70e564559a8c644d&query=${updatedTitle}`)
    .then(response => response.json())
    .then(data => this.setState({ movieResults: data.results }));
  }

  clearQuery() {
    this.setState({ userSearch: '' });
  }

  render() {
    let input;
    return (
      <div>
        <div className="search-input-container">
          <form
          id='search-input-container'
          onClick={ (e) => {
            e.preventDefault();
            this.retrieveMovieSearch(input.value);
            this.clearQuery();
          }}>
            <input
              className="search-input"
              placeholder="Enter Movie Title"
              autoFocus
              ref={ node => { input = node }}
            />
            <button
              className="button search-movies-button"
            > Search
            </button>
          </form>
        </div>
        <div className="search-movie-card-container">
        {this.state.movieResults.map(movie =>
          <MovieCard movie={movie} key={movie.id} user={this.state.user}/>
        )}
        </div>
      </div>
    );
  }
}
