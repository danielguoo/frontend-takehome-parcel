import React, { Component, useEffect } from 'react'

export default class GemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searchedGems: [],
      savedGems: localStorage.getItem('savedGems') ? JSON.parse(localStorage.getItem('savedGems')) : {},
      errorMessage: ''
    };
  } 

  handleChange = (e) => { 
    this.setState({searchValue: e.target.value});
  }

  handleSubmit = (e) =>  {
    fetch(`http://localhost:3000/api/v1/search.json?query=${this.state.searchValue}`)
      // What if there are multiple pages of gems? add param &page=2
      .then(response => response.json())
      .then(data => {
        data.length === 0 ?
          this.setState({errorMessage: 'No results found'}) :
          this.setState({searchedGems: data, errorMessage: ''});
      });
      // Error handling!
    console.log(this.state);
    e.preventDefault();
  }

  toggleSaveGem = (gem) => {
    let { savedGems } = this.state;
    if (gem.name in savedGems) {
      delete savedGems[gem.name];
    }
    else {
      savedGems[gem.name] = gem;
    }
    this.setState({savedGems});
    localStorage.setItem('savedGems', JSON.stringify(savedGems)); 
  }

  render() {
    const { searchValue, searchedGems, savedGems, errorMessage } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search for a Gem: 
            <input type="text" value={searchValue} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h3>Search Results:</h3>
        {
          errorMessage ?
          errorMessage :
          <SearchResults
            searchedGems={searchedGems}
            savedGems={savedGems}
            toggleSaveGem={this.toggleSaveGem}
          />
        }
        <br/>
        <h3>Saved Gems:</h3>
        <SavedGemsList
          savedGems={savedGems}
          toggleSaveGem={this.toggleSaveGem}
        />
      </div>
    )
  }
}

const SavedGemsList = ({savedGems, toggleSaveGem}) => {
  const savedGemsArray = Object.values(savedGems);
  return (
    <div>
      {
        savedGemsArray.length === 0 ?
        'Search and save for a gem!'
        :
        <ul>
          {
            savedGemsArray.map((gem, i) => (
              <GemInfo key={i} gem={gem} isSaved={gem.name in savedGems} toggleSaveGem={toggleSaveGem} />
            ))
          }
        </ul>
      }
    </div>
  )
}

const SearchResults = ({searchedGems, savedGems, toggleSaveGem}) => {
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

const GemInfo = ({gem, isSaved, toggleSaveGem}) => {
  return (
    <div>
      {gem.name}
      <button onClick={() => toggleSaveGem(gem)}>
        {isSaved ? 'Unsave' :' Save' }
      </button> 
    </div>
  )
}
