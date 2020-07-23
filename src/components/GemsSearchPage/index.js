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
      message: 'Search for a gem to see results.',
      searchView: true,
      loading: false,
    };
  } 

  handleChange = (e) => { 
    this.setState({searchValue: e.target.value});
  }

  handleSubmit = (e) =>  {
    this.startLoading()
    fetch(`${API_URL}?query=${this.state.searchValue}`)
      // What if there are multiple pages of gems? add param &page=2
      .then(response => response.json())
      .then(data => {
        data.length === 0 ?
        this.setState({message: 'No results found.', loading: false}) :
        this.setState({searchedGems: data, message: '', searchView: true, loading: false});
      }).catch(e => {
        this.setState({message: 'There was an error while searching for your query. Please try again.', loading: false})
      });
    e.preventDefault();
  }

  startLoading = () => {
    this.setState({loading: true})
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
    const { searchValue, searchedGems, savedGems, message, searchView, loading } = this.state;
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
              message={message}
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