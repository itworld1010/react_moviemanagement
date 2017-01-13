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
      runtime: 0,
      movieDetails: []
    }
  }

  componentWillMount() {
    let user = this.props.user
    let movie = this.props.movie
    let DVD = this.props.movie.DVD
    let Bluray = this.props.movie.Bluray
    let iTunes = this.props.movie.iTunes
    let Prime = this.props.movie.Prime
    this.setState({ user, movie, DVD, Bluray, iTunes, Prime })

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
    let genreArray = (this.state.movie.genres.map((e) => this.genreSwitch(e)))
    this.setState({ cast: cast, genreNamesArray: genreArray })
    this.open()
  }

  minutesConverter(minutes){
    let hours = Math.floor(minutes / 60)
    let newMinutes = minutes % 60
    return `${hours} hours, ${newMinutes} minutes`
  }

  updateFormat(format){
    const title = this.props.id
    const { user } = this.state;
    this.setState({ [format]: !this['state'][format] })
    firebase.database().ref('users/' + user.displayName).child(title).child('movie').update({
      [format]: this.state[format]
    });
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


  render() {
    let writers = (filter(this.props.credits.crew, {'department': "Writing"})).map((e) => e.name).join(', ')
    let writersArray = filter(this.props.credits.crew, {'department': "Writing"})
    let genre
    let uniqueID = this.props.movieID
    let director = filter(this.props.credits.crew, {'job': "Director"}).map((e) => e.name).join(', ')
    let directorsArray = filter(this.props.credits.crew, {'job': "Director"})

    return (
          <Modal backdrop className="modal-container" show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header classname="modal-header" >
                    <Modal.Title className="modal-title absolute-center"><span className="relative-center">{this.props.movie.movie.title}</span><button className="button modal-top-exit" onClick={() => this.close()}>X</button></Modal.Title>
                    </Modal.Header>
                    <a className="details-ref" name="details" />
                    <button onClick={() =>  this.delete()}className="delete">Delete movie</button>
                    <Modal.Body className="modal-body">
                      <img className="modal-backdrop" src={"https://image.tmdb.org/t/p/w500" + this.props.movie.movie.backdrop_path}  />
                      <div className="absolute-center to-deets-abs-center">
                        <a className="trailer-link relative-center" href="#trailer">Trailer</a>
                      </div>
                      <div className="modal-movie-deets" >
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
                            <td>{this.props.movie.movie.overview}</td>
                          </tr>
                        </table>
                        {/* <p className="modal-crew">
                          {directorsArray.length > 1 ? 'Directors: ' : 'Director: '}  {director} <br/><br/>
                          Genre: {this.state.genreNamesArray.join(', ')} <br/><br/>
                          Runtime:  {this.minutesConverter(this.state.runtime)} <br/><br/>
                          {writersArray.length > 1 ? 'Writers: ' : 'Writer: '} {writers} <br/><br/>
                          Plot: {this.props.movie.movie.overview}
                        </p> */}
                      </div>
                      <div  className="modal-button-box">
                        <form>
                          <input
                            className={this.state.DVD ? 'modal-format-button format-true button' : 'modal-format-button format-false button'}
                            type="button"
                            value="DVD"
                            onClick={() => this.updateFormat('DVD')}
                          />
                          <input
                            className={this.state.Bluray ? 'modal-format-button format-true button' : 'modal-format-button format-false button'}
                            type="button"
                            value="Blu-ray"
                            onClick={() => this.updateFormat('Bluray')}
                          />
                          <input
                            className={this.state.iTunes ? 'modal-format-button format-true button' : 'modal-format-button format-false button'}
                            type="button"
                            value="iTunes"
                            onClick={() => this.updateFormat('iTunes')}
                          />
                          <input
                            className={this.state.Prime ? 'modal-format-button format-true button' : 'modal-format-button format-false button'}
                            type="button"
                            value="Prime"
                            onClick={() => this.updateFormat('Prime')}
                          />
                        </form>
                      </div>
                      <div className="actor-list">
                        {this.state.cast.map((m, i) =>
                        <ActorCard cast={m} key={m.id}/>
                        )}
                      </div>
                      <div className="youtube-container">
                      <div className="absolute-center back-to-deets-abs-center">
                        <a className="relative-center" name="trailer" href="#details">Back to Details</a>
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
    )
  }
}
