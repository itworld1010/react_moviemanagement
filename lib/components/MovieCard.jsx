import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';



export default class MovieCard extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      addMovieClick: false,
      DVD: false,
      Bluray: false,
      iTunes: false,
      Prime: false
    }
  }

  componentWillMount() {
    let user = this.props.user
    this.setState({ user })
  }

  addNewMovie(movie) {
    const { user } = this.state;
    firebase.database().ref('users/' + user.displayName).push({
      movie: movie
    });
  }

  render() {

    return (
      <article className="movie-card">
        {this.props.movie.poster_path ?
          <img
          className="poster"
          src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path}
          />
          : <img src={npa} className="poster"/>}
        <article>
          {!this.state.addMovieClick?
            <div>
              <p className="card-title" >{this.props.movie.title}
                <span className="release-year">({this.props.movie.release_date.substring(0, 4)})</span>
              </p>
              <p className="card-body">{this.props.movie.overview}</p>
            </div>
            :
            <form>
              <input type="button" value="DVD" onClick={() => {this.setState({ DVD: true})}}/>
              <input type="button" value="Blu-ray" onClick={() => {this.setState({ Bluray: true})}}/>
              <input type="button" value="iTunes" onClick={() => {this.setState({ iTunes: true})}}/>
              <input type="button" value="Prime" onClick={() => {this.setState({ Prime: true})}}/>
            </form>
          }
        </article>
        <article>
          {!this.state.addMovieClick ?
            <button
            onClick={() => {this.setState({ addMovieClick: true })}}
            className="movie-card-button"
            >Add Movie
            </button>
            :
            <button
            onClick={() => {this.setState({ addMovieClick: true })}}
            className="movie-card-button"
            >Submit
            </button>
          }
        </article>
      </article>
    )
  }
}
