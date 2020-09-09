import React from 'react'

const Select = props => {
  const {
    title,
    name,
    value = '',
    handleChange,
    placeholder,
    options = []
  } = props

  return (
    <div className='form-group'>
      {title && <label> {title} </label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className='form-control'
      >
        <option value=''>
          {placeholder}
        </option>
        {options.map(option => {
          return (
            <option
              key={option.id}
              value={option.id}
            >
              {option.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select
