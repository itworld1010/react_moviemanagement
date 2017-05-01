import React, { Component } from 'react';
import firebase from '../../firebase';
import { filter } from 'lodash';
import YouTube from 'react-youtube'
import RateMovie from '../RateMovie'
import { ActorCard } from '../ActorCard'
import {YouTubeComp} from '../Helpers/YouTubeComp'
var classNames = require('classnames');

export default class PersonalMovieModal extends Component {
  constructor() {
    super();
    this.state = {
      showTrailer: false
    };
  }

  componentWillMount(){
    let user = this.props.user
    let movie = this.props.movie.movie
    let DVD = this.props.movie.DVD
    let Bluray = this.props.movie.Bluray
    let iTunes = this.props.movie.iTunes
    let Prime = this.props.movie.Prime
    let rating = this.props.movie.rating
    this.setState({ user, movie, DVD, Bluray, iTunes, Prime, rating })
  }

  delete() {
    const title = this.props.id;
    const { user } = this.state;
    firebase.database().ref('users/' + user.displayName).child(title).remove()
  }

  changeRating(rating) {
    const title = this.props.id;
    const { user } = this.state;
    const selectedRating = rating.value;
    if (selectedRating.value !== 'Show-all') {
      this.setState({ rating: selectedRating });
    }
    firebase.database().ref('users/' + user.displayName).child(title).child('movie')
    .update({
      rating: selectedRating,
    });
  }

  updateFormat(format) {
    const title = this.props.id;
    const { user } = this.state;
    this.setState({ [format]: !this['state'][format] });
    setTimeout(() => {
      firebase.database().ref('users/' + user.displayName).child(title).child('movie')
      .update({
        [format]: this.state[format],
      });
    }, 100);
  }

  toggleTrailer() {
    this.setState({ showTrailer: !this.state.showTrailer })
  }

  render() {
    let modalShow = this.props.showModal ? 'show-modal' : 'hide-modal'
    let modal = classNames('modal-false', modalShow)
    const writers = (filter(this.props.movie.credits.crew, { department: 'Writing' })).map(e => e.name).join(', ');
    const writersArray = filter(this.props.movie.credits.crew, { department: 'Writing' });
    const director = filter(this.props.movie.credits.crew, { job: 'Director' }).map(e => e.name).join(', ');
    const directorsArray = filter(this.props.movie.credits.crew, { job: 'Director' });
    const moviePath = this.props.movie.movie

    return (
      <div className={modal}>
      <div className="modal-background" onClick={() => this.props.close()}></div>
      <div className="modal-container" >
      <img className="modal-backdrop" src={'https://image.tmdb.org/t/p/w500' + this.props.movie.movie.backdrop_path} />
        <div className="modal-header">
            <p className="modal-title">{this.props.movie.movie.original_title}</p>
            <p className="modal-close-title" onClick={() => this.props.close()}>X</p>
        </div>
        <div className="modal-body-container">
        <div className="modal-body">
        <div className="movie-details">
          <div className="flex-row">
            <div className="modal-movie-deets" >
              <table>
              <tbody>
                <tr>
                  <th>{directorsArray.length > 1 ? 'Directors:' : 'Director:'}</th>
                  <td>{director}</td>
                </tr>
                <tr>
                  <th>Genre:</th>
                  <td>{this.props.genreNamesArray.join(', ')}</td>
                </tr>
                <tr>
                  <th>Runtime:</th>
                  <td>{this.props.minutesConverter(this.props.runtime)}</td>
                </tr>
                <tr>
                  <th>{writersArray.length > 1 ? 'Writers:' : 'Writer:'}</th>
                  <td>{writers}</td>
                </tr>
                <tr>
                  <th>Plot:</th>
                  <td>{this.props.movie.movie.overview}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-button-box">
            <RateMovie rate={this.changeRating.bind(this)} rating={this.state.rating}/>
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
              <div className="trailer-container" onClick={() => this.toggleTrailer()}>
                <img src={`https://img.youtube.com/vi/${this.props.youtubeID}/0.jpg`} className="trailer-link" />
                <p className="play-trailer">PLAY<br/>TRAILER</p>
              </div>
              <button onClick={() => this.delete()} className="delete">Delete movie</button>
              { this.state.showTrailer ?
                <YouTubeComp
                youtubeID={this.props.youtubeID}
                showTrailer={this.state.showTrailer}
                toggleTrailer={this.toggleTrailer.bind(this)}
                />
                :
                null
              }
            </div>
          </div>
          </div>
          <div className="actor-list">
          {this.props.cast.map((m, i) =>
          <ActorCard cast={m} key={m.id} />
          )}
          </div>
                </div>
              </div>
            </div>
            </div>
    );
  }
}
