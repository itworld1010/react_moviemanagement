import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';
import { Modal, Header, OverlayTrigger, Button } from 'react-bootstrap'
import { map, extend, keyBy, keys, mapValues, values, find, get, forEach, join, dropRight, filter } from 'lodash';
import ActorCard from './ActorCard'
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
      runtime: 0
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.movie.id}/credits?api_key=1500d38f789b9c7a70e564559a8c644d`)
    .then((response) => response.json())
    .then((response) => this.setState({ credits: response }))

    fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.movie.id}/videos?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US`)
    .then((response) => response.json())
    .then((response) => this.setState({ trailers: response }))

    fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.movie.id}?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US`)
    .then((response) => response.json())
    .then((data) => this.setState({ movieDetails: data }))
  }

  addNewMovie(movie) {
    const { user } = this.state;
    firebase.database().ref('users/' + user.displayName).push({
      movie: movie
    });
  }

  updateFormat(format){
    let { user } = this.props
    let title = this.props.id
    this.setState({ [format]: !this['state'][format]})
    let state = !this.state[format]
    firebase.database().ref('users/' + user.displayName).child(title).child('movie').update({
      [format]: state
    })
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
    let cast = this.state.credits.cast
    let genreArray = (this.state.genres.map((e) => this.genreSwitch(e)))
    this.setState({ cast: cast, genreNamesArray: genreArray })
    this.open()
  }

  minutesConverter(minutes){
    let hours = Math.floor(minutes / 60)
    let newMinutes = minutes % 60
    return `${hours} hours, ${newMinutes} minutes`
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
     this.setState({ showModal: true });
   }

  render() {
    let writers = (filter(this.state.credits.crew, {'department': "Writing"})).map((e) => e.name).join(', ')
    let genre
    let uniqueID = this.state.movieID
    let director = get((find(this.state.credits.crew, {'job': "Director"})), 'name')
    let runtime = setTimeout(() => {this.setState({ runtime: this.state.movieDetails.runtime})}, 300)

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
          className="personal-movie-card-button" onClick={() => this.setCast()}></Button>
          <Modal backdrop className="modal-container" show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header className="modal-header">
                      <Modal.Title className="modal-title">{this.props.movie.movie.title}<button className="button modal-top-exit" onClick={() => this.close()}>X</button></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                      <div className="modal-movie-deets" >
                      <p className="modal-crew modal-director">Director: {director}</p>
                      <p className="modal-crew modal-genre">Genre: {this.state.genreNamesArray.join(', ')} </p>
                      <p className="modal-runtime modal-crew" > {this.minutesConverter(this.state.runtime)}</p>
                      <p className="modal-crew modal-writers">Writer(s): {writers}</p>
                      <p className="modal-crew modal-overview">{this.props.movie.movie.overview}</p>
                      </div>
                      <img className="modal-backdrop" src={"https://image.tmdb.org/t/p/w500" + this.props.movie.movie.backdrop_path}  />
                      <div className="actor-list">
                        {this.state.cast.map((m, i) =>
                        <ActorCard cast={m} key={m.id}/>
                        )}
                      </div>
                      <div className="youtube-container">
                      { this.state.youtubeID ?
                        <YouTube
                          className="youtube"
                          controls="1"
                          videoId={this.state.youtubeID}
                          loop="1"
                        />
                      :
                        <YouTube
                          className="youtube"
                          controls="1"
                          fs
                          videoId='dQw4w9WgXcQ'
                        />
                      }
                      </div>
                    </Modal.Body>
                  </Modal>
        </article>
    )
  }
}
