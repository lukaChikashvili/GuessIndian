import React from 'react'
import logo from '../assets/georgian.png'

const GeoModal = ({play}) => {
  return (
    <div className='geo-modal'>
    <img src = {logo} />
   <div className='inner'>
   <h1>
      You win! you chose the georgian guy!
    </h1>
    <button onClick = {play}>Play again</button>
   </div>
   
  </div>
  )
}

export default GeoModal
