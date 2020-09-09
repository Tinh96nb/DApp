import React from 'react'

const Input = props => {
  const {
    title,
    name,
    type,
    value,
    isRequired = false,
    handleChange,
    placeholder
  } = props
  return (
    <div className='form-group'>
      {title && <label className='form-label'>
        {title}
      </label>
      }
      {isRequired && <span className='text-danger'> *</span>}
      <input
        className='form-control'
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
