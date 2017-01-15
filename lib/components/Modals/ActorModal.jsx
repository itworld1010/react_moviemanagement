import React, { Component } from 'react';
// import npa from './images/no-poster.png'
// import firebase from '../firebase';
import { Modal, Header, OverlayTrigger, Button } from 'react-bootstrap'

export default class ActorModal extends Component {
  constructor() {
    super();
    this.state = {
      cast: null,
    }
  }

  render() {
    return(
      <Modal backdrop className="modal-container" show={this.props.show}>
        <Modal.Header className="modal-header">
          <Modal.Title
            className="modal-title absolute-center">
              <span
                className="relative-center">
                  Actor
              </span>
              <button
                className="button modal-top-exit" >
                  X
              </button></Modal.Title>
        </Modal.Header>
      <a className="details-ref" name="details" />
      <Modal.Body className="modal-body">
      <p>Hello</p>
      <button onClick={() => this.props.showActorDetail()}>Back to {this.props.title}</button>
      </Modal.Body>
      </Modal>
    )
  }
}
