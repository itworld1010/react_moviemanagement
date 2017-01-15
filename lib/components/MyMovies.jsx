import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';
import { pick, map, extend, filter, keyBy } from 'lodash';
import PersonalMovieCard from './PersonalMovieCard'
import FilterByFormat from './MyMovieFilters/FilterByFormat'
import FilterByRating from './MyMovieFilters/FilterByRating'
import FilterByGenre from './MyMovieFilters/FilterByGenre'

export default class MyMovies extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movies: [],
      filtered: [],
      genres:[],
      currentFormat: '',
      currentRating: '',
      currentGenre: ''
    }
  }

  componentWillMount() {
   let user = this.props.user
   this.setState({ user })
  }

  componentDidMount() {
    firebase.database().ref('users/' + this.state.user.displayName).on('value', (snapshot) => {
      const movies = snapshot.val()
      this.setState({
        movies: map(movies, (val, key) => extend(val, { key }))
      });
    })
  }

  filterByFormat(format) {
    let selectedFormat = format.value
    if(this.state.filtered.length === 0)
      {let filtered = filter(this.state.movies, (o) => o.movie[selectedFormat])
      this.setState({ filtered: filtered, currentFormat: format.value })
    } else {
      let filtered = filter(this.state.filtered, (o) => o.movie[selectedFormat])
      this.setState({ filtered: filtered, currentFormat: format.value })
    }
  }

  filterByRating(rating) {
    let selectedRating = String(rating.value)
    if(this.state.filtered.length === 0)
      { let filtered = filter(this.state.movies, (o) => o.movie.rating === selectedRating)
      this.setState({ filtered: filtered, currentRating: rating.value })
    } else {
      let filtered = filter(this.state.filtered, (o) => o.movie.rating === selectedRating)
      this.setState({ filtered: filtered, currentRating: rating.value })
    }
  }

  filterByGenre(genre) {
    let selectedGenre = genre.value
    if(selectedGenre !== 'notrated')
      { let filtered = filter(this.state.movies, (o) => o.movie.genres.includes(genre.value))
      this.setState({ filtered: filtered, currentGenre: genre.value })
    } else {
      let filtered = filter(this.state.filtered, (o) => o.movie.rating === selectedRating)
      this.setState({ filtered: filtered, currentGenre: rating.value })
    }
  }

  genreSwitch(genreID) {
     if (genreID === 28){return "Action"}
     else if (genreID === 12){return "Adventure"}
     else if (genreID === 16){return "Animation"}
     else if (genreID === 35){return "Comedy"}
     else if (genreID === 80){return "Crime"}
     else if (genreID === 99){return "Documentary"}
     else if (genreID === 18){return "Drama"}
     else if (genreID === 10751){return "Family"}
     else if (genreID === 14){return "Fantasy"}
     else if (genreID === 36){return "History"}
     else if (genreID === 27){return "Horror"}
     else if (genreID === 10402){return "Music"}
     else if (genreID === 9648){return "Mystery"}
     else if (genreID === 10749){return "Romance"}
     else if (genreID === 878){return "Science Fiction"}
     else if (genreID === 10770){return "TV Movie"}
     else if (genreID === 53){return "Thriller"}
     else if (genreID === 10752){return "War"}
     else if (genreID === 5373){return "Western"}
   }

  render() {

    let { user } = this.state
    let { DVD, Bluray, Prime, iTunes } = this.state
    let filteredMovieDisplay = this.state.filtered.map(m => <PersonalMovieCard {...m} user={user} key={m.key} id={m.key}/>)
    let movieDisplay = this.state.movies.map(m => <PersonalMovieCard {...m} user={user} key={m.key} id={m.key}/>)

    return (
      <div>
        <div className="p-movie-search">
          <FilterByFormat filter={this.filterByFormat.bind(this)} currentFormat={this.state.currentFormat}/>

          <FilterByRating filter={this.filterByRating.bind(this)} currentRating={this.state.currentRating}/>

          <FilterByGenre filter={this.filterByGenre.bind(this)}
          currentGenre={this.state.currentGenre}/>
        </div>
        <div className="my-movie-card-container">
          {this.state.filtered.length === 0 ? movieDisplay : filteredMovieDisplay }
        </div>
      </div>
    )
  }
}
