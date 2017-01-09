import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';
import {Modal, Header, OverlayTrigger} from 'react-bootstrap'
import {Button} from 'react-bootstrap'

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
      showModal: false
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
    this.setState({ user, movie, DVD, Bluray, iTunes, Prime, id })
  }

  addNewMovie(movie) {
    const { user } = this.state;
    firebase.database().ref('users/' + user.displayName).push({
      movie: movie
    });
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
        <article>
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
          className="movie-card-button" onClick={() => this.open()}>Test</Button>
          <Modal className="modal-container" show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h4>Text in a modal</h4>
                      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                      <hr />

                      <h4>Overflowing text to show scroll behavior</h4>
                      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>

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
