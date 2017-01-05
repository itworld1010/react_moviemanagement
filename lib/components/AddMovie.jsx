import React, { Component } from 'react';

export const AddMovie = ({ retrieveMovieSearch }) => {

  let input

    return (
      <div className="settings-form">
        <form
          id='input-container'
          onSubmit={ (e) => {
          e.preventDefault()
          retrieveMovieSearch(input.value)
        }}>
          <input
            ref={ node => { input = node }}
          />
          <button
          > Enter a Movie Title
          </button>
        </form>
      </div>
  )
}

export default AddMovie;
