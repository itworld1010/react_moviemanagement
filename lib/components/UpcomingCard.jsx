import React, { Component } from 'react';
import npa from '../images/no-poster.png';
import firebase from '../firebase';
import { filter, map, forEach, dropRight } from 'lodash';
import YouTube from 'react-youtube';
import ActorCard from './ActorCard';
import UpcomingMovieModal from './Modals/UpcomingMovieModal';

export default class MovieCard extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movie: null,
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
    };
  }

  componentWillMount() {
    const user = this.props.user;
    const movie = this.props.movie;
    this.setState({ user, movie })

    fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.id}/credits?api_key=1500d38f789b9c7a70e564559a8c644d`)
    .then(response => response.json())
    .then(response => this.setState({ credits: response }));

    fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.id}/videos?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US`)
    .then(response => response.json())
    .then(response => this.setState({ trailers: response }));
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.id}?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US`)
    .then(response => response.json())
    .then(data => this.setState({ movieDetails: data }));
  }

  setCast() {
    let holy;
    const trailerObj = map(this.state.trailers.results, 'key')
    if (trailerObj.length === 1) {
      holy = trailerObj;
    } else {
      holy = dropRight(trailerObj, (trailerObj.length - (trailerObj.length - 1)));
    }
    forEach(holy, e => this.setState({ youtubeID: e }));
    const cast = this.state.credits.cast;
    const genreArray = (this.state.movie.genre_ids.map(e => this.genreSwitch(e)));
    this.setState({ cast, genreNamesArray: genreArray });
    this.open();
  }
  open() {
    this.setState({ runtime: this.state.movieDetails.runtime });
    this.setState({ showModal: true });
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

  close() {
    this.setState({ showModal: false });
  }

  render() {
    console.log(this.state.movieDetails);
    return (
      <article className="upcoming-movie-card">
        <div className="upcoming-poster-container">
        {this.props.movie.poster_path ?
          <img
            className="poster"
            alt={this.props.movie.original_title}
            src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path}
          />
          : <img alt={this.props.movie.title} src={npa} className="poster"/>}
          </div>
          <button
            alt={this.props.movie.original_title}
            className="upcoming-movie-card-button button"
            onClick={() => this.setCast()}>
          </button>
            { !this.state.showModal ?
              null
            :
              <UpcomingMovieModal
                user={this.state.user}
                movie={this.props.movie}
                close={this.close.bind(this)}
                minutesConverter={this.minutesConverter.bind(this)}
                credits={this.state.credits}
                cast={this.state.cast}
                genreNamesArray={this.state.genreNamesArray}
                showModal={this.state.showModal}
                youtubeID={this.state.youtubeID}
                runtime={this.state.runtime}
              />
            }
        </article>
    );
  }
}
