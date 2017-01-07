import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';



export default class MovieCard extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movie: null
    }
  }

  componentWillMount() {
    let user = this.props.user
    let movie = this.props.movie
    this.setState({ user, movie })
  }

  render() {
    console.log(this.state.movies);

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
                {/* <span className="release-year">({this.state.movie.release_date.substring(0, 4)})</span> */}
              </p>
              <p className="card-body">{this.state.movie.movie.overview}</p>
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
