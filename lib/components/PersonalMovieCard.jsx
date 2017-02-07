import React, { Component } from 'react';
import npa from '../images/no-poster.png';
import firebase from '../firebase';
import { Modal, Header, OverlayTrigger, Button } from 'react-bootstrap';
import { map, forEach, dropRight } from 'lodash';
import PersonalMovieModal from './Modals/PersonalMovieModal';
import YouTube from 'react-youtube';

export default class PersonalMovieCard extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movie: null,
      DVD: '',
      Bluray: '',
      iTunes: '',
      Prime: '',
      viewDetailClick: false,
      showModal: false,
      movieID: '',
      cast: [],
      credits: '',
      director: '',
      genreNamesArray: [],
      genres: [],
      trailers: '',
      youtubeID: '',
      runtime: 0,
      movieDetails: [],
      actorDetail: false,
      rating: '',
    };
  }

  componentWillMount() {
    const user = this.props.user;
    const movie = this.props.movie;
    const DVD = this.props.movie.DVD;
    const Bluray = this.props.movie.Bluray;
    const iTunes = this.props.movie.iTunes;
    const Prime = this.props.movie.Prime;
    const rating = this.props.movie.rating;
    this.setState({ user, movie, DVD, Bluray, iTunes, Prime, rating });

    fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.movie.id}/videos?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US`)
    .then(response => response.json())
    .then(response => this.setState({ trailers: response }));
  }

  addNewMovie(movie) {
    const { user } = this.state;
    firebase.database().ref('users/' + user.displayName).push({
      movie
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  setCast() {
    let holy;
    const trailerObj = map(this.state.trailers.results, 'key');
    if (trailerObj.length === 1) {
      holy = trailerObj;
    } else {
      holy = dropRight(trailerObj, (trailerObj.length - (trailerObj.length - 1)));
    }
    forEach(holy, e => this.setState({ youtubeID: e }));
    const cast = this.props.movie.credits.cast;
    const genreArray = (this.state.movie.genres.map(e => this.genreSwitch(e)));
    this.setState({ cast, genreNamesArray: genreArray });
    this.open();
  }

  minutesConverter(minutes) {
    const hours = Math.floor(minutes / 60);
    const newMinutes = minutes % 60;
    return `${hours} hours, ${newMinutes} minutes`;
  }

  genreSwitch(genreID) {
    if (genreID === 28){return 'Action'}
    else if (genreID === 12) { return 'Adventure' }
    else if (genreID === 16) { return 'Animation' }
    else if (genreID === 35) { return 'Comedy' }
    else if (genreID === 80) { return 'Crime' }
    else if (genreID === 99) { return 'Documentary' }
    else if (genreID === 18) { return 'Drama' }
    else if (genreID === 10751) { return 'Family' }
    else if (genreID === 14) { return 'Fantasy' }
    else if (genreID === 36) { return 'History' }
    else if (genreID === 27) { return 'Horror' }
    else if (genreID === 10402) { return 'Music' }
    else if (genreID === 9648) { return 'Mystery' }
    else if (genreID === 10749) { return 'Romance' }
    else if (genreID === 878) { return 'Science Fiction' }
    else if (genreID === 10770) { return 'TV Movie' }
    else if (genreID === 53) { return 'Thriller' }
    else if (genreID === 10752) { return 'War' }
    else if (genreID === 5373) { return 'Western' }
  }

  open() {
    this.setState({ runtime: this.props.movie.movieDetails.runtime });
    this.setState({ showModal: true });
  }

  showActorDetail() {
    this.setState({ actorDetail: !this.state.actorDetail });
  }

  render() {
    return (
      <article className="personal-movie-card poster-container">
        {this.props.movie.movie.poster_path ?
          <img
            className="poster"
            alt={this.props.movie.movie.title}
            src={"https://image.tmdb.org/t/p/w500" + this.props.movie.movie.poster_path}
          />
          : <img alt={this.props.movie.movie.title} src={npa} className="poster"/>}
          <button
            alt={this.props.movie.movie.title}
            className="personal-movie-card-button"
            onClick={() => this.setCast()}>
          </button>
            { !this.state.showModal ?
            null
          :
          <PersonalMovieModal
            user={this.props.user}
            showModal={this.state.showModal}
            movie={this.props.movie}
            close={this.close.bind(this)}
            genreNamesArray={this.state.genreNamesArray}
            minutesConverter={this.minutesConverter.bind(this)}
            runtime={this.state.runtime}
            cast={this.state.cast}
            youtubeID={this.state.youtubeID}
            id={this.props.id}
            />
        }
        </article>
    );
  }
}
