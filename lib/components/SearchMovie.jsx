import React, { Component } from 'react';

export const SearchMovie = ({ clearQuery, userSearch, updateSearchQuery, retrieveMovieSearch }) => {

  let input

    return (
      <div className="settings-form">
      <form
      id='input-container'
      onSubmit={ (e) => {
        e.preventDefault()
        retrieveMovieSearch(input.value)
        clearQuery()
      }}>
      <input
      value={userSearch}
      onChange={(e) => updateSearchQuery(input.value)}
      ref={ node => { input = node }}
      />
      <button
      > Enter a Movie Title
      </button>
      </form>
      </div>
    )

}

export default SearchMovie;
