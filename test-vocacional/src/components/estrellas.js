import React, { useState } from 'react';

function Estrellas({ groupName, questionIndex, onChange }) {
  const [selectedValue, setSelectedValue] = React.useState(0);


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(groupName, questionIndex, event.target.value);
  };

  return (
    <div className='calificacion'>
      {[...Array(10)].map((_, index) => {
        const value = 10 - index;
        return (
          <React.Fragment key={value}>
            <input
              id={`radio${groupName + questionIndex}${value}`}
              type="radio"
              name={groupName + questionIndex}
              value={value}
              checked={selectedValue === value.toString()}
              onChange={handleChange}
            />
            <label
              htmlFor={`radio${groupName + questionIndex}${value}`}
              className={selectedValue >= value ? 'yellow' : 'black'}
            >
              ★
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Estrellas