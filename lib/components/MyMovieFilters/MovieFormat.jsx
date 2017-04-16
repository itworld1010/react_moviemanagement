import React from 'react'
import Select from 'react-select';

const MovieFormat = ({ handleSelectChange, value }) => {
  const options = [
      { value: 'Bluray', label: 'Blu-ray' },
      { value: 'DVD', label: 'DVD' },
      { value: 'Google', label: 'Google' },
      { value: 'iTunes', label: 'iTunes' },
      { value: 'Prime', label: 'Prime' }
  ];

  return (
    <Select
        name="form-field-name"
        className="format-filter"
        multi
        value={value}
        searchable={false}
        placeholder="Movie Format..."
        options={options}
        simpleValue={true}
        onChange={handleSelectChange}
    />
  );
};

export default MovieFormat;
