import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';
import { Modal, Header, OverlayTrigger, Button } from 'react-bootstrap'
import { filter, map, extend, keys, get, forEach, join, dropRight } from 'lodash';
import YouTube from 'react-youtube'
import ActorCard from './ActorCard'

export default class PopularMovieCard extends Component {
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
      runtime: 0
    }
  }

  componentWillMount() {
    let user = this.props.user
    let movie = this.props.movie
    this.setState({ user, movie })

    fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.id}/credits?api_key=1500d38f789b9c7a70e564559a8c644d`)
    .then((response) => response.json())
    .then((response) => this.setState({ credits: response }))

    fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.id}/videos?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US`)
    .then((response) => response.json())
    .then((response) => this.setState({ trailers: response }))
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.id}?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US`)
    .then((response) => response.json())
    .then((data) => this.setState({ movieDetails: data }))
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
    let genreArray = (this.state.movie.genre_ids.map((e) => this.genreSwitch(e)))
    this.setState({ cast: cast, genreNamesArray: genreArray })
    this.open()
  }

  open() {
    this.setState({ runtime: this.state.movieDetails.runtime})
    this.setState({ showModal: true });
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

  close() {
    this.setState({ showModal: false });
  }

  render() {
    let director = filter(this.state.credits.crew, {'job': "Director"}).map((e) => e.name).join(', ')
    let directorsArray = filter(this.state.credits.crew, {'job': "Director"})
    let writersArray = filter(this.state.credits.crew, {'department': "Writing"})
    let writers = (filter(this.state.credits.crew, {'department': "Writing"})).map((e) => e.name).join(', ')

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
          <Button bsStyle="primary"
                  bsSize="large"
                  alt={this.props.movie.original_title}
                  className="upcoming-movie-card-button button"
                  onClick={() => this.setCast()}>
          </Button>
          <Modal backdrop className="modal-container" show={this.state.showModal} onHide={() => this.close()}>
            <Modal.Header className="modal-header" >
                      <Modal.Title className="modal-title absolute-center"><span className="upcoming-relative-center">{this.props.movie.original_title}</span><button className="button modal-top-exit" onClick={() => this.close()}>X</button></Modal.Title>
                      </Modal.Header>
                      <a name="details" />
                    <Modal.Body className="modal-body">
                      <img className="modal-backdrop" src={"https://image.tmdb.org/t/p/w500" + this.props.movie.backdrop_path}  />
                      <div className="absolute-center to-deets-abs-center">
                        <a className="trailer-link relative-center" href="#trailer">Trailer</a>
                      </div>
                      <div className="modal-movie-deets">
                      <table>
                        <tr>
                          <th>{directorsArray.length > 1 ? 'Directors:' : 'Director:'}</th>
                          <td>{director}</td>
                        </tr>
                        <tr>
                          <th>Genre:</th>
                          <td>{this.state.genreNamesArray.join(', ')}</td>
                        </tr>
                        <tr>
                          <th>Runtime:</th>
                          <td>{this.minutesConverter(this.state.runtime)}</td>
                        </tr>
                        <tr>
                          <th>{writersArray.length > 1 ? 'Writers:' : 'Writer:'}</th>
                          <td>{writers}</td>
                        </tr>
                        <tr>
                          <th>Plot:</th>
                          <td>{this.props.movie.overview}</td>
                        </tr>
                      </table>
                      </div>
                      <div className="actor-list">
                        {this.state.cast.map((m, i) =>
                        <ActorCard cast={m} key={m.id}/>
                        )}
                      </div>
                      <div className="youtube-container">
                      <div className="absolute-center back-to-deets-abs-center">
                        <a name="trailer" href="#details">Back to Details</a>
                      </div>
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
