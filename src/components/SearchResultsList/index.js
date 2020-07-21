import React from 'react';
import GemInfo from '../GemInfo';
import './SearchResultsList.css';

export default ({searchedGems, savedGems, toggleSaveGem}) => {
  return (
    <div>
      {
        searchedGems.length === 0 ?
        'Search for a gem to see results'
        :
        <ul>
          {
            searchedGems.map((gem, i) => (
              <GemInfo key={i} gem={gem} isSaved={gem.name in savedGems} toggleSaveGem={toggleSaveGem} />
            ))
          }
        </ul>
      }
    </div>
  )
}

