import React from 'react';
import GemInfo from '../GemInfo';
import './SavedGemsList.css';

export default ({ savedGems, toggleSaveGem }) => {
  const savedGemsArray = Object.values(savedGems);

  return (
    <div>
      <h3>Saved Gems:</h3>
      {
        savedGemsArray.length === 0 ?
        <p> Search and save for a gem! </p>
        :
        <ul>
        {
          savedGemsArray.map((gem, i) => (
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