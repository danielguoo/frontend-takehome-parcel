import React, { Component } from 'react';
import SearchResultsList from '../SearchResultsList';
import SavedGemsList from '../SavedGemsList';
import Toggle from '../Toggle';
import './GemsSearchPage.css';
import { MdSearch } from "react-icons/md";
import ReactLoading from "react-loading";

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
      loading: false,
    };
  } 

  handleChange = (e) => { 
    this.setState({searchValue: e.target.value});
  }

  handleSubmit = (e) =>  {
    this.toggleLoading()
    // Refactor to recrusive pagination
    fetch(`${API_URL}?query=${this.state.searchValue}`)
      // What if there are multiple pages of gems? add param &page=2
      .then(response => response.json())
      .then(data => {
        data.length === 0 ?
        this.setState({errorMessage: 'No results found.', loading: false}) :
        this.setState({searchedGems: data, errorMessage: '', searchView: true, loading: false});
      }).catch(e => {
        this.setState({errorMessage: 'There was an error searching your query. Please try again.', loading: false})
      });
      // Error handling!
    e.preventDefault();
  }

  toggleLoading = () => {
    this.setState({loading: !this.state.loading})
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
    const { searchValue, searchedGems, savedGems, errorMessage, searchView, loading } = this.state;
    return (
      <div className="Container">
        <Search
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
              errorMessage={errorMessage}
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

const Search = ({searchValue, handleChange, handleSubmit}) => (
  <form className="Search" onSubmit={handleSubmit}>
    <input 
      type="text"
      placeholder="Search for Ruby Gems!"
      value={searchValue}
      onChange={handleChange}
    />
    <button type="submit"> <MdSearch/> </button>
  </form>
)