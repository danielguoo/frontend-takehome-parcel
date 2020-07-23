import React, { Component } from 'react';
import SearchResultsList from '../SearchResultsList';
import SavedGemsList from '../SavedGemsList';
import Toggle from '../Toggle';
import SearchBar from '../SearchBar';
import './GemsSearchPage.css';
import ReactLoading from "react-loading";

const API_URL = 'http://localhost:3000/api/v1/search.json';
const API_ERROR = 'There was an error while searching for your query. Please try again.';
const NO_RESULTS_SEARCH_MESSAGE = 'No results found.';

export default class GemsSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      searchValue: '',
      searchedGems: [],
      savedGems: localStorage.getItem('savedGems') ? JSON.parse(localStorage.getItem('savedGems')) : {},
      searchMessage: 'Search for a gem to see results.', // Error handling for Search
      searchView: true,
      loading: false,
    };
  } 

  handleChange = (e) => { 
    this.setState({searchValue: e.target.value});
  }

  handleSubmit = (e) =>  {
    this.startLoading()
    getRubyGems(this.state.searchValue)
      .then(newSearchState => {
        this.setState(newSearchState);
      });
    e.preventDefault();
  }

  startLoading = () => {
    this.setState({loading: true})
  }

  toggleSaveGem = (gem) => {
    let { savedGems } = this.state;
    // savedGems object indexed by name makes it much faster to check if a particular gem is saved
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
    const { searchValue, searchedGems, savedGems, searchMessage, searchView, loading } = this.state;
    return (
      <div className="Container">
        <SearchBar
          searchValue={searchValue}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <Toggle 
          toggleSearchView={this.toggleSearchView}
          searchView={searchView}
        />
        {loading ? 
          <ReactLoading 
            className="Loading"
            type='spinningBubbles'
            color='#a5aeaf'
            height='36px'
            width='36px'
          />
          :
          searchView ?
            <SearchResultsList
              message={searchMessage}
              searchedGems={searchedGems}
              savedGems={savedGems}
              toggleSaveGem={this.toggleSaveGem}
            />
            :
            <SavedGemsList
              savedGems={savedGems}
              toggleSaveGem={this.toggleSaveGem}
            />
          }
      </div>
    )
  }
}

export function getRubyGems(searchValue) {
  return fetch(`${API_URL}?query=${searchValue}`)
    // What if there are multiple pages of gems? add param &page=2
    .then(response => response.json())
    .then(data => {
      const searchMessage = data.length === 0 ? NO_RESULTS_SEARCH_MESSAGE : '';
      return {searchedGems: data, searchMessage, searchView: true, loading: false};
    }).catch(e => {
      // console.log(e) for debugging purposes
      return {searchedGems: [], searchMessage: API_ERROR, searchView: true, loading: false};
    });
}