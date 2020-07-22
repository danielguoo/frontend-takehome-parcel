import React from 'react';
import GemInfo from '../GemInfo';
import './SearchResultsList.css';

export default ({errorMessage, searchedGems, savedGems, toggleSaveGem}) => {
  return (
    <div>
      {
        errorMessage ? 
          <p className="Message"> {errorMessage} </p> :
            searchedGems.length === 0 ?
              <p className="Message"> Search for a gem to see results. </p>
              :
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

