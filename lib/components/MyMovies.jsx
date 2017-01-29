import React, { Component } from 'react';
import firebase from '../firebase';
import { map, extend, filter } from 'lodash';
import PersonalMovieCard from './PersonalMovieCard';
import FilterByFormat from './MyMovieFilters/FilterByFormat';
import FilterByRating from './MyMovieFilters/FilterByRating';
import FilterByGenre from './MyMovieFilters/FilterByGenre';

export default class MyMovies extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movies: [],
      filtered: [],
      genres: [],
      currentFormat: '',
      currentRating: '',
      currentGenre: '',
    };
  }

  componentWillMount() {
    const user = this.props.user;
    this.setState({ user });
  }

  componentDidMount() {
    firebase.database().ref('users/' + this.state.user.displayName).on('value', (snapshot) => {
      const movies = snapshot.val();
      this.setState({
        movies: map(movies, (val, key) => extend(val, { key })),
      });
    });
  }

  filterByFormat(format) {
    const selectedFormat = format.value;
    const filtered = filter(this.state.movies, o => o.movie[selectedFormat]);
    this.setState({ filtered, currentFormat: format.value });
  }

  filterByRating(rating) {
    const selectedRating = String(rating.value);
    const filtered = filter(this.state.movies, o => o.movie.rating === selectedRating);
    this.setState({ filtered, currentRating: rating.value });
  }

  filterByGenre(genre) {
    const filtered = filter(this.state.movies, o => o.movie.genres.includes(genre.value));
    this.setState({ filtered, currentGenre: genre.value });
  }

  clearFilters() {
    this.setState({ filtered: this.state.movies, currentGenre: '', currentRating: '', currentFormat: '' })
  }

  render() {
    const { user } = this.state;
    const filteredMovieDisplay = this.state.filtered.map(m =>
      <PersonalMovieCard {...m} user={user} key={m.key} id={m.key}/>);
    const movieDisplay = this.state.movies.map(m =>
      <PersonalMovieCard {...m} user={user} key={m.key} id={m.key}/>);

    return (
      <div className="my-movies-entire-container">
        <div className="p-movie-search">
          <button onClick={() => this.clearFilters()} className="button remove-filters">Remove Filters</button>
          <FilterByFormat
            filter={this.filterByFormat.bind(this)}
            currentFormat={this.state.currentFormat}
          />

          <FilterByRating
            filter={this.filterByRating.bind(this)}
            currentRating={this.state.currentRating}
          />

          <FilterByGenre
            filter={this.filterByGenre.bind(this)}
            currentGenre={this.state.currentGenre}
          />
        </div>
        <div className="my-movie-card-container">
          {this.state.filtered.length === 0 ? movieDisplay : filteredMovieDisplay }
        </div>
      </div>
    );
  }
}
