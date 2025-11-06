import React from 'react'

const Books = (props) => {
  return (
    
    <div>
      <h1>{props.obj.name}</h1>
      <p>ID: {props.obj.id}</p>
    </div>

  )
}

export default Books