import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';

export default class MyMovies extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movies: ''
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  componentDidMount() {
    firebase.database().ref('users/' + user.displayName).on('value', (snapshot) => {
      const movies = snapshot.val() || {};
      this.setState({
        movies: map(movies, (val, key) => extend(val, { key }))
      });
    });
  }

  render() {


    return (
      <div>
        <p>Hello</p>
      </div>
      // <article className="movie-card">
      //   {this.props.movie.poster_path ?
      //     <img
      //     className="poster"
      //     src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path}
      //     />
      //     : <img src={npa} className="poster"/>}
      //   <p className="card-title" >{this.props.movie.title}
      //     <span className="release-year">({this.props.movie.release_date.substring(0, 4)})</span>
      //   </p>
      //   <p className="card-body">{this.props.movie.overview}</p>
      //   <button
      //     onClick={() => this.addNewMovie(this.props.movie)}
      //     className="movie-card-button"
      //   >Add Movie
      //   </button>
      // </article>
    )
  }
}
