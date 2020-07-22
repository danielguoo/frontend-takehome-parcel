import React from 'react'
import './GemInfo.css'
import { MdStar, MdStarBorder } from "react-icons/md";
import { IconContext } from "react-icons";

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
          <IconContext.Provider value ={{size: "30px", color: "gold"}}>
            {isSaved ? 
              <MdStar className="Icon"/> :
              <MdStarBorder className="Icon"/>}
          </IconContext.Provider>
        </button>
      </div>

    </div>
  )
}