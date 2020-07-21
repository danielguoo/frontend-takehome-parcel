import React, { Component } from 'react';
import SearchResultsList from '../SearchResultsList';
import SavedGemsList from '../SavedGemsList';
import './GemsSearchPage.css';

const API_URL = 'http://localhost:3000/api/v1/search.json';

export default class GemsSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      searchValue: '',
      searchedGems: [],
      savedGems: localStorage.getItem('savedGems') ? JSON.parse(localStorage.getItem('savedGems')) : {},
      errorMessage: '',
      searchView: true,
    };
  } 

  handleChange = (e) => { 
    this.setState({searchValue: e.target.value});
  }

  handleSubmit = (e) =>  {
    // Refactor to recrusive pagination
    fetch(`${API_URL}?query=${this.state.searchValue}`)
      // What if there are multiple pages of gems? add param &page=2
      .then(response => response.json())
      .then(data => {
        data.length === 0 ?
          this.setState({errorMessage: 'No results found'}) :
          this.setState({searchedGems: data, errorMessage: ''});
      });
      // Error handling!
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

  toggleSearchView = (searchView) => {
    this.setState({searchView});
  }

  render() {
    const { searchValue, searchedGems, savedGems, errorMessage, searchView } = this.state;
    return (
      <div>
        <div className="Search">
          <h2> Search for Ruby Gems! </h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={searchValue} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="Toggle">
          <button 
            className={searchView ? "Selected" : "Unselected"}
            onClick={() => this.toggleSearchView(true)}
          > 
            Search Results
          </button>
          <button
            className={searchView ? "Unselected" : "Selected"}
            onClick={() => this.toggleSearchView(false)}
          > 
            Saved Results
          </button>
        </div>
        {searchView ?
          <div>
            <h3> Search Results: </h3>
            {
              errorMessage ?
              <p> {errorMessage} </p> :
              <SearchResultsList
                searchedGems={searchedGems}
                savedGems={savedGems}
                toggleSaveGem={this.toggleSaveGem}
              />
            }
            <br/>
          </div>
          :
          <div>
            <SavedGemsList
              savedGems={savedGems}
              toggleSaveGem={this.toggleSaveGem}
            />
          </div>
        }
      </div>
    )
  }
}