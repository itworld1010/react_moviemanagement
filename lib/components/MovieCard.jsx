import React, { Component } from 'react';
import npa from '../images/no-poster.png'



export default class MovieCard extends Component {

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
        {this.props.movie.overview.length > 150 ?
          <p
            className="card-body"
          > ({this.props.movie.overview.substring(0, 150)}...
          </p>
          : <p className="card-body" >{this.props.movie.overview}</p>}
        <button>Movie Detail</button>
      </article>
    )
  }
}
