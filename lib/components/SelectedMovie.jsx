import React, { Component } from 'react';
import npa from '../images/no-poster.png'


export default class SelectedMovie extends Component {

  render() {

    return (
      <article className="movie-card">
      {this.props.movie.poster_path ?
        <img
        className="poster"
        src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path}
        />
        : <img src={npa} className="poster"/>
      }
      <p className="card-title" >{this.props.movie.title}
      <span className="release-year">({this.props.movie.release_date.substring(0, 4)})</span>
      </p>
      <p className="card-body">{this.props.movie.overview}</p>
        <button type="radio">Blu-ray</button>
        <button>DVD</button>
        <button>iTunes</button>
        <button>Amazon Prime</button>
        </article>
    )
  }
}
