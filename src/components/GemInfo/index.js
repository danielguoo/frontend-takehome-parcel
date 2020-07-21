import React from 'react'
import './GemInfo.css'

export default ({ gem, isSaved, toggleSaveGem }) => {
  return (
    <div className="GemInfo">
      <div className="LeftBlock">
        <p> 
          <span className="GemName"> {gem.name} </span>
          <i>{gem.version}</i>
        </p>
        <p> {gem.info} </p>
      </div>
      <div className="RightBlock">
        <button onClick={() => toggleSaveGem(gem)}>
          {isSaved ? 'Unsave' : ' Save'}
        </button>
      </div>

    </div>
  )
}