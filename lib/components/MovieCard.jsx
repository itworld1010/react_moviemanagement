// need to find better alternative to alt text in button

import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';



export default class MovieCard extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movie: null,
      addMovieClick: false,
      DVD: false,
      Bluray: false,
      iTunes: false,
      Prime: false,
      submit: false
    }
  }

  componentWillMount() {
    let user = this.props.user
    let movie = this.props.movie
    this.setState({ user, movie })
  }

  addNewMovie(movie) {
    const { user } = this.state;
    firebase.database().ref('users/' + user.displayName).push({
      movie: movie
    });
  }

  createAndSend(){
    this.setState({ submit: !this.state.submit })
    const newMovie = {
      movie: this.state.movie,
      DVD: this.state.DVD,
      Bluray: this.state.Bluray,
      iTunes: this.state.iTunes,
      Prime: this.state.Prime
    };
    this.addNewMovie(newMovie);
    this.setState({ addMovieClick: !this.state.addMovieClick })
  }

  render() {
    console.log(this.state.user)

    return (
      <article className="movie-card">
        {this.state.movie.poster_path ?
          <img
          className="poster"
          src={"https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path}
          />
          : <img src={npa} className="poster"/>}
        <article>
          {!this.state.addMovieClick?
            <div>
              <p className="card-title" >{this.state.movie.title}
                <span className="release-year">({this.state.movie.release_date.substring(0, 4)})</span>
              </p>
              <p className="card-body">{this.state.movie.overview}</p>
            </div>
            :
            <form>
              <input type="button" value="DVD" onClick={() => {this.setState({ DVD: !this.state.DVD })}}/>
              <input type="button" value="Blu-ray" onClick={() => {this.setState({ Bluray: !this.state.Bluray })}}/>
              <input type="button" value="iTunes" onClick={() => {this.setState({ iTunes: !this.state.iTunes })}}/>
              <input type="button" value="Prime" onClick={() => {this.setState({ Prime: !this.state.Prime })}}/>
            </form>
          }
        </article>
        <article>
          {!this.state.addMovieClick ?
            <button
            onClick={() => {this.setState({ addMovieClick: true })}}
            className="movie-card-button"
            >{!this.state.submit ? 'Add Movie' : 'Added to your movies'}
            </button>
            :
            <button
            onClick={() => this.createAndSend()}
            className="movie-card-button"
            >Submit
            </button>
          }
        </article>
      </article>
    )
  }
}
