import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';



export default class PersonalMovieCard extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movie: null,
      DVD: '',
      Bluray: '',
      iTunes: '',
      Prime: ''
    }
  }

  componentWillMount() {
    let user = this.props.user
    let movie = this.props.movie
    let DVD = this.props.movie.DVD
    let Bluray = this.props.movie.Bluray
    let Prime = this.props.movie.Prime
    let iTunes = this.props.movie.iTunes
    this.setState({ user, movie, DVD, Bluray, iTunes, Prime })
  }

  addNewMovie(movie) {
    const { user } = this.state;
    firebase.database().ref('users/' + user.displayName).push({
      movie: movie
    });
  }

  createAndSend(){
    const newMovie = {
      movie: this.state.movie,
      DVD: this.state.DVD,
      Bluray: this.state.Bluray,
      iTunes: this.state.iTunes,
      Prime: this.state.Prime
    };
    this.addNewMovie(newMovie);
  }

  render() {

    return (
      <article className="movie-card">
        {this.state.movie.movie.poster_path ?
          <img
          className="poster"
          src={"https://image.tmdb.org/t/p/w500" + this.state.movie.movie.poster_path}
          />
          : <img src={npa} className="poster"/>}
        <article>
          {!this.state.addMovieClick?
            <div>
              <p className="card-title" >{this.state.movie.movie.title}
                <span className="release-year">({this.state.movie.movie.release_date.substring(0, 4)})</span>
              </p>
              <p className="card-body">{this.state.movie.movie.overview}</p>
            </div>
            :
            <form>
              <input className={this.state.DVD ? 'format-true' : 'format-false'} type="button" value="DVD" onClick={() => {this.setState({ DVD: !this.state.DVD })}}/>
              <input className={this.state.Bluray ? 'format-true' : 'format-false'} type="button" value="Blu-ray" onClick={() => {this.setState({ Bluray: !this.state.Bluray })}}/>
              <input className={this.state.iTunes ? 'format-true' : 'format-false'} type="button" value="iTunes" onClick={() => {this.setState({ iTunes: !this.state.iTunes })}}/>
              <input className={this.state.Prime ? 'format-true' : 'format-false'} type="button" value="Prime" onClick={() => {this.setState({ Prime: !this.state.Prime })}}/>
            </form>
          }
        </article>
        <article>
            <button
            onClick={() => {this.setState({ addMovieClick: true })}}
            className="movie-card-button"
            >View Detail
            </button>
        </article>
      </article>
    )
  }
}
