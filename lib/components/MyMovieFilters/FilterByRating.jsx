import React from 'react'
import Select from 'react-select';


const FilterByRating = ({ filter, currentRating }) => {
  var options = [
    { value: 'show-all', label: 'Show All...' },
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
        value={currentRating}
        autofocus
        className="movie-filter"
        searchable={false}
        placeholder="Select Movie Rating..."
        options={options}
        onChange={filter}
    />
  )
}

export default FilterByRating
