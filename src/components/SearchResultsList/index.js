import React from 'react';
import GemInfo from '../GemInfo';
import './SearchResultsList.css';

export default ({message, searchedGems, savedGems, toggleSaveGem}) => {
  return (
    <div>
      {
        message ? 
          <p className="Message">{message}</p> :
          <ul>
            {
              searchedGems.map((gem, i) => (
                <GemInfo
                  key={i}
                  gem={gem}
                  isSaved={gem.name in savedGems}
                  toggleSaveGem={toggleSaveGem}
                />
              ))
            }
          </ul>
      }
    </div>
  )
}

