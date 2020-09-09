import React from 'react'

export function Heading (props) {
  const { text = '' } = props
  return (
    <div className='heading'>
      <h2 className='heading-inner'>
        text
      </h2>
    </div>
  )
}
