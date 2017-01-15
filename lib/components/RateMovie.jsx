import React from 'react'
import logo from '../images/reel.png'
import Select from 'react-select';


const RateMovie = ({ rate, rating }) => {
  var options = [
      { value: 'notrated', label: 'Rate movie...' },
      { value: 'ten', label: '⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️ 10/10' },
      { value: 'nine', label: '⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️ 9/10' },
      { value: 'eight', label: '⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️ 8/10' },
      { value: 'seven', label: '⭐️⭐️⭐️⭐️⭐️⭐️⭐️ 7/10' },
      { value: 'six', label: '⭐️⭐️⭐️⭐️⭐️⭐️ 6/10' },
      { value: 'five', label: '⭐️⭐️⭐️⭐️⭐️ 5/10' },
      { value: 'four', label: '⭐️⭐️⭐️⭐️ 4/10' },
      { value: 'three', label: '⭐️⭐️⭐️ 3/10' },
      { value: 'two', label: '⭐️⭐️ 2/10' },
      { value: 'one', label: '⭐️ 1/10' }
  ];

  return(
    <Select
        name="form-field-name"
        value={rating}
        autofocus
        clearable={false}
        className="rate-movie"
        searchable={false}
        placeholder={"Rate movie..."}
        options={options}
        onChange={rate}
    />
  )
}

export default RateMovie
