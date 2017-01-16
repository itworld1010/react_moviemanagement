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
      submit: false,
      credits: null,
      trailers: null,
      movieDetails: null
    }
  }

  componentWillMount() {
    let user = this.props.user
    let movie = this.props.movie
    this.setState({ user, movie })
  }

  addNewMovie(movie) {
     const title = this.state.movie.title + this.state.movie.release_date
     const { user } = this.state;
     firebase.database().ref('users/' + user.displayName).child(title).set({
       movie
     });
   }

   fetchDetails() {
     this.setState({ addMovieClick: !this.state.addMovieClick })
     fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.id}/credits?api_key=1500d38f789b9c7a70e564559a8c644d`)
     .then((response) => response.json())
     .then((response) => this.setState({ credits: response }))

     fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.id}?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US`)
     .then((response) => response.json())
     .then((data) => this.setState({ movieDetails: data }))
   }

  createAndSend(){
    this.setState({ submit: !this.state.submit })
    const newMovie = {
      movieDetails: this.state.movieDetails,
      credits: this.state.credits,
      movie: this.state.movie,
      genres: this.state.movie.genre_ids,
      DVD: this.state.DVD,
      Bluray: this.state.Bluray,
      iTunes: this.state.iTunes,
      Prime: this.state.Prime,
      rating: 'unrated'
    };
    this.addNewMovie(newMovie);
    this.setState({ addMovieClick: !this.state.addMovieClick })
  }

  render() {

    return (
      <article className="movie-card">
        <div className="poster-container">
        {this.state.movie.poster_path ?
          <img
          className="poster"
          src={"https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path}
          />
          : <img src={npa} className="poster"/>}
          </div>
          {!this.state.addMovieClick?
            <div className="center">
              <p className="card-title" >{this.state.movie.title}</p>
              {this.state.movie.release_date ?
                <p className="card-release-year">({this.state.movie.release_date.substring(0, 4)})</p>
                :
                <p className="card-release-year">Not Available</p>
              }

            </div>
            :
            <div  className="button-box">
              <form>
                <input
                  className={this.state.DVD ? 'format-button format-true button' : 'format-button format-false button'}
                  type="button"
                  value="DVD"
                  onClick={() => {this.setState({ DVD: !this.state.DVD })}}
                />
                <input
                  className={this.state.Bluray ? 'format-button format-true button' : 'format-button format-false button'}
                  type="button"
                  value="Blu-ray"
                  onClick={() => {this.setState({ Bluray: !this.state.Bluray })}}
                />
                <input
                  className={this.state.iTunes ? 'format-button format-true button' : 'format-button format-false button'}
                  type="button"
                  value="iTunes"
                  onClick={() => {this.setState({ iTunes: !this.state.iTunes })}}
                />
                <input
                  className={this.state.Prime ? 'format-button format-true button' : 'format-button format-false button'}
                  type="button"
                  value="Prime"
                  onClick={() => {this.setState({ Prime: !this.state.Prime })}}
                />
              </form>
            </div>
          }
        <article className="p-movie-card-buttons">
          {!this.state.addMovieClick ?
            <button
              onClick={() => this.fetchDetails()}
              className="movie-card-button"
              disabled={!this.state.submit ? false : true }
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
