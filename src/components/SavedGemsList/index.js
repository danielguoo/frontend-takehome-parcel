import React from 'react';
import GemInfo from '../GemInfo';
import './SavedGemsList.css';

export default ({ savedGems, toggleSaveGem }) => {
  const savedGemsArray = Object.values(savedGems);

  return (
    <div>
      {
        savedGemsArray.length === 0 ?
        <p className="Message"> Search and save for gems to see them appear here. </p>
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