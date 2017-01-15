import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';
import { Modal, Header, OverlayTrigger, Button } from 'react-bootstrap'
import { map, extend, keyBy, keys, mapValues, values, find, get, forEach, join, dropRight, filter } from 'lodash';
import ActorModal from './Modals/ActorModal'
import PersonalMovieModal from './Modals/PersonalMovieModal'
import YouTube from 'react-youtube'

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
      actorDetail: false
    }
  }

  componentWillMount() {
    let user = this.props.user
    let movie = this.props.movie
    let DVD = this.props.movie.DVD
    let Bluray = this.props.movie.Bluray
    let iTunes = this.props.movie.iTunes
    let Prime = this.props.movie.Prime
    let rating = this.props.movie.rating
    this.setState({ user, movie, DVD, Bluray, iTunes, Prime, rating })

    fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.movie.id}/videos?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US`)
    .then((response) => response.json())
    .then((response) => this.setState({ trailers: response }))
  }

  addNewMovie(movie) {
    const { user } = this.state;
    firebase.database().ref('users/' + user.displayName).push({
      movie: movie
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  setCast() {
    let holy
    let trailerObj = map(this.state.trailers.results, 'key')
    if( trailerObj.length === 1 ) {
      holy = trailerObj
    } else {
      holy = dropRight(trailerObj, (trailerObj.length - (trailerObj.length - 1)))
    }
    forEach(holy, (e) => this.setState({ youtubeID: e}))
    let cast = this.props.movie.credits.cast
    let genreArray = (this.state.movie.genres.map((e) => this.genreSwitch(e)))
    this.setState({ cast: cast, genreNamesArray: genreArray })
    this.open()
  }

  minutesConverter(minutes){
    let hours = Math.floor(minutes / 60)
    let newMinutes = minutes % 60
    return `${hours} hours, ${newMinutes} minutes`
  }

  delete() {
    const title = this.props.id
    const { user } = this.state;
    firebase.database().ref('users/' + user.displayName).child(title).remove()
  }

  genreSwitch(genreID) {
     if (genreID === 28){return "Action"}
     else if (genreID === 12){return "Adventure"}
     else if (genreID === 16){return "Animation"}
     else if (genreID === 35){return "Comedy"}
     else if (genreID === 80){return "Crime"}
     else if (genreID === 99){return "Documentary"}
     else if (genreID === 18){return "Drama"}
     else if (genreID === 10751){return "Family"}
     else if (genreID === 14){return "Fantasy"}
     else if (genreID === 36){return "History"}
     else if (genreID === 27){return "Horror"}
     else if (genreID === 10402){return "Music"}
     else if (genreID === 9648){return "Mystery"}
     else if (genreID === 10749){return "Romance"}
     else if (genreID === 878){return "Science Fiction"}
     else if (genreID === 10770){return "TV Movie"}
     else if (genreID === 53){return "Thriller"}
     else if (genreID === 10752){return "War"}
     else if (genreID === 5373){return "Western"}
   }

  open() {
    this.setState({ runtime: this.props.movie.movieDetails.runtime})
    this.setState({ showModal: true });
   }

   showActorDetail() {
     this.setState({ actorDetail: !this.state.actorDetail })
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
          <Button bsStyle="primary"
            bsSize="large"
            alt={this.props.movie.movie.title}
            className="personal-movie-card-button"
            onClick={() => this.setCast()}>
          </Button>
          {!this.state.actorDetail ?
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
              showActorDetail={this.showActorDetail.bind(this)}
              />
              :
              <ActorModal
                show={this.state.showModal}
                showActorDetail={this.showActorDetail.bind(this)}
                title={this.props.movie.movie.original_title}
              />
              }
        </article>
    )
  }
}
