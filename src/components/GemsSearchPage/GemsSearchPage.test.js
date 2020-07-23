import React from "react";
import { configure, mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import GemsSearchPage from './index';
import Adapter from 'enzyme-adapter-react-16';
import SearchResultsList from '../SearchResultsList';
import SavedGemsList from '../SavedGemsList';
import ReactLoading from "react-loading";

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

describe('handleSubmit', () => {
  const fakeEvent = { preventDefault: () => 'preventDefault' };

  it('should should set searchedGems data to fetch result', () => {
    const mockGemsList = [{gem: null}];
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: () => ({data: mockGemsList})}));
    const wrapper = shallow(<GemsSearchPage/>);
    wrapper.instance().handleSubmit(fakeEvent);
    wrapper.update();
    expect(global.fetch).toHaveBeenCalled();
    expect(wrapper.state().searchedGems).toBe(mockGemsList);
    expect(wrapper.state().searchMessage).toBe('');
    expect(wrapper.state().searchView).toBe(true);
    expect(wrapper.state().loading).toBe(false);
  });
});
