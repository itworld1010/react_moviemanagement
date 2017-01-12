import React, { Component } from 'react';
import firebase, { usersFromDatabase, signIn, signOut } from '../firebase';
import { pick, split, map } from 'lodash';
import MovieCard from './MovieCard'


export default class SearchMovie extends Component {
  constructor(){
    super()
    this.state = {
      user: null,
      movieResults: [],
      userSearch: ''
    }
  }

  componentDidMount() {
   let user = this.props.user
   this.setState({ user })
  }

  retrieveMovieSearch(input) {
    const updatedTitle = input.replace('', '+')
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=1500d38f789b9c7a70e564559a8c644d&query=${updatedTitle}`)
    .then((response) => response.json())
    .then(data => this.setState( {movieResults: data.results} ))
  }

  updateSearchQuery(query) {
    this.setState({ userSearch: query })
  }

  clearQuery() {
    this.setState({ userSearch: ''})
  }

  render() {
    let input

    return(
      <div>
        <div className="search-input-container">
          <form
          id='search-input-container'
          onClick={ (e) => {
            e.preventDefault()
            this.retrieveMovieSearch(input.value)
            this.clearQuery()
          }}>
            <input
              className="search-input"
              // value={this.state.userSearch}
              placeholder="Enter Movie Title"
              // onChange={(e) => this.updateSearchQuery(input.value)}
              ref={ node => { input = node }}
            />
            <button
              className="button search-movies-button"
            > Search
            </button>
          </form>
        </div>
        <div className="search-movie-card-container">
        {this.state.movieResults.map((movie, index) =>
          <MovieCard movie={movie} key={movie.id} user={this.state.user}/>
        )}
        </div>
      </div>
    )
  }
}
