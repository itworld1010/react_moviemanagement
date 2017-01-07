import React, { Component } from 'react'
import firebase, { usersFromDatabase, signIn, signOut } from '../firebase';
import { pick, split, map } from 'lodash';
import SearchMovie from './SearchMovie'
import MovieCard from './MovieCard'
import Navigation from './Navigation'
// import MyMovies from './MyMovies'
import logo from '../images/reel.png'



export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movieResults: [],
      userSearch: ''
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
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
    this.setState({userSearch: ''})
  }

  render() {

    return (
      <div className="Application">
        <div className="App-header">
        <Navigation user={this.state.user}/>

          <img src={logo} className="logo" alt="logo" />
          <h2>Welcome to MovieKeeper</h2>
          <SearchMovie clearQuery={this.clearQuery.bind(this)} updateSearchQuery={this.updateSearchQuery.bind(this)} userSearch={this.state.userSearch} retrieveMovieSearch={this.retrieveMovieSearch.bind(this)}/>
        </div>
          {this.state.movieResults.map((m, i) =>
            <MovieCard movie={m} key={m.id} user={this.state.user}/>
          )}
      </div>
    )
  }
}
