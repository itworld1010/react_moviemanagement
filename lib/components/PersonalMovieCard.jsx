import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';
import { Modal, Header, OverlayTrigger, Button } from 'react-bootstrap'
import { map, extend, keyBy, keys, mapValues, values } from 'lodash';
import ActorCard from './ActorCard'



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
      cast: []
    }
  }

  componentWillMount() {
    let user = this.props.user
    let movie = this.props.movie
    let DVD = this.props.movie.DVD
    let Bluray = this.props.movie.Bluray
    let Prime = this.props.movie.Prime
    let iTunes = this.props.movie.iTunes
    let id = this.props.id
    let movieID = this.props.movie.movie.id
    this.setState({ user, movie, DVD, Bluray, iTunes, Prime, id, movieID })
  }

  addNewMovie(movie) {
    const { user } = this.state;
    firebase.database().ref('users/' + user.displayName).push({
      movie: movie
    });
  }

  retrieveMovieDetails(unique) {
    fetch(`https://api.themoviedb.org/3/movie/${unique}/credits?api_key=1500d38f789b9c7a70e564559a8c644d`)
    .then((response) => response.json())
    .then((response) => response.cast)
    // .then((response) => keyBy(response, 'name'))
    .then((response) => this.setState({ cast: response }))
    .then(this.open())
  }

  updateFormat(format){
    let { user } = this.state
    let title = this.state.id
    this.setState({ [format]: !this['state'][format]})
    let state = !this.state[format]
    firebase.database().ref('users/' + user.displayName).child(title).child('movie').update({
      [format]: state
    })
  }

  close() {
   this.setState({ showModal: false });
  }

   open() {
     this.setState({ showModal: true });
   }


  render() {
    let uniqueID = this.state.movieID

    return (
      <article className="personal-movie-card">
        {this.state.movie.movie.poster_path ?
          <img
          className="poster"
          src={"https://image.tmdb.org/t/p/w500" + this.state.movie.movie.poster_path}
          />
          : <img src={npa} className="poster"/>}
        <article>
          {!this.state.viewDetailClick?
            <div>
              <p className="card-title" >{this.state.movie.movie.title}
                <span className="release-year">({this.state.movie.movie.release_date.substring(0, 4)})</span>
              </p>
              <p className="card-body">{this.state.movie.movie.overview}</p>
            </div>
            :
            <form>
              <input className={this.state.DVD ? 'format-true' : 'format-false'} type="button" value="DVD" onClick={() => this.updateFormat('DVD')}/>
              <input className={this.state.Bluray ? 'format-true' : 'format-false'} type="button" value="Blu-ray" onClick={() => this.updateFormat('Bluray')}/>
              <input className={this.state.iTunes ? 'format-true' : 'format-false'} type="button" value="iTunes" onClick={() => this.updateFormat('iTunes')}/>
              <input className={this.state.Prime ? 'format-true' : 'format-false'} type="button" value="Prime" onClick={() => this.updateFormat('Prime')}/>
            </form>
          }
        </article>
        <article className="p-movie-card-buttons">
          { !this.state.viewDetailClick ?
            <button
            onClick={() => {this.setState({ viewDetailClick: !this.state.viewDetailClick })}}
            className="movie-card-button"
            >View Formats
            </button>
            :
            <button
            onClick={() => {this.setState({ viewDetailClick: !this.state.viewDetailClick })}}
            className="movie-card-button"
            >View Overview
            </button>
          }
          <Button bsStyle="primary"
          bsSize="large"
          className="movie-card-button" onClick={() => this.retrieveMovieDetails(uniqueID)}>The Sauce</Button>
          <Modal className="modal-container" show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                      <Modal.Title>{this.state.movie.movie.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                      {this.state.movie.movie.overview}
                      {this.state.cast.map((m, i) =>
                        <ActorCard cast={m} key={m.id}/>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                  </Modal>
        </article>
      </article>
    )
  }
}
