import React from "react";
import { configure, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import GemsSearchPage, { getRubyGems } from './index';
import Adapter from 'enzyme-adapter-react-16';
import SearchResultsList from '../SearchResultsList';
import SavedGemsList from '../SavedGemsList';
import ReactLoading from "react-loading";

const API_ERROR = 'There was an error while searching for your query. Please try again.';
const NO_RESULTS_SEARCH_MESSAGE = 'No results found.'

configure({ adapter: new Adapter() });

describe('GemsSearchPage', () => {
  it('snapshot renders', () => {
    const component = renderer.create(<GemsSearchPage/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
}); 

describe('Current View', ()=> {
  const wrapper = mount(<GemsSearchPage />);
  it('should initially show search results view', () => {
    expect(wrapper.find(SearchResultsList).length).toBe(1);
    expect(wrapper.find(SavedGemsList).length).toBe(0);
  });

  it('should show the saved gems view when the search view is toggled', () => {
    // wrapper.instance().toggleSearchView(); doesn't work on arrow functions?
    wrapper.setState({searchView: false});
    expect(wrapper.find(SearchResultsList).length).toBe(0);
    expect(wrapper.find(SavedGemsList).length).toBe(1);
  });

  it('should display the loading component if loading', () => {
    wrapper.setState({loading: true});
    expect(wrapper.find(ReactLoading).length).toBe(1);
  });
});

describe('getRubyGems', () => {
  it('should should return searchedGems in an object when there are gems found', () => {
    const mockGemsList = [{gem: null}];
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: () => (mockGemsList)}));
    return getRubyGems('test').then( getResponse  => {
      expect(global.fetch).toHaveBeenCalled();
      expect(getResponse.searchedGems).toBe(mockGemsList);
      expect(getResponse.searchMessage).toBe('');
      expect(getResponse.searchView).toBe(true);
      expect(getResponse.loading).toBe(false);
    });
  });

  it('should should set search Message when no results are found', () => {
    const mockGemsList = [];
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: () => (mockGemsList)}));
    return getRubyGems('testefcds').then( getResponse  => {
      expect(global.fetch).toHaveBeenCalled();
      expect(getResponse.searchedGems).toBe(mockGemsList);
      expect(getResponse.searchMessage).toBe(NO_RESULTS_SEARCH_MESSAGE);
      expect(getResponse.searchView).toBe(true);
      expect(getResponse.loading).toBe(false);
    });
  });

  it('should should set an Error message if the API call fails', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject({e: "Network Error"}));
    return getRubyGems('test').then( getResponse  => {
      expect(global.fetch).toHaveBeenCalled();
      expect(getResponse.searchedGems).toStrictEqual([]);
      expect(getResponse.searchMessage).toBe(API_ERROR);
      expect(getResponse.searchView).toBe(true);
      expect(getResponse.loading).toBe(false);
    });
  });
});
