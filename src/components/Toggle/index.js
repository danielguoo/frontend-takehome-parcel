import React from 'react';
import './Toggle.css';

export default ({toggleSearchView, searchView}) => (
  <div className="Toggle">
    <button 
      className={searchView ? "Selected" : "Unselected"}
      onClick={() => toggleSearchView(true)}
    > 
      Search Results
    </button>
    <button
      className={searchView ? "Unselected" : "Selected"}
      onClick={() => toggleSearchView(false)}
    > 
      Saved Gems
    </button>
  </div>
)