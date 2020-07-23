import React from 'react';
import { configure, mount } from 'enzyme';
import SearchResultsList from './index';
import GemInfo from '../GemInfo';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const gems = [
  {
    name: 'testGem',
    version: '1.0',
    info: 'This is a test gem',
  },
];

const saved = {
  testGem: {
    name: 'testGem',
    version: '1.0',
    info: 'This is a test gem',
  },
};

const NO_RESULTS_MESSAGE = 'No Results Found';

describe('GemInfo Component', () => {
  const toggleSaveGem = jest.fn();
  const wrapper = mount(<SearchResultsList 
                          toggleSaveGem={toggleSaveGem}
                          savedGems={saved}
                          searchedGems={gems}
                          message=''
                        />);

  it('render a GemInfo if there are searched gems', () => {
    expect(wrapper.find(GemInfo).length).toBe(1);
    expect(wrapper.find(GemInfo).props().gem).toEqual(gems[0]);
    expect(wrapper.find(GemInfo).props().isSaved).toEqual(true);
  });

  it('should display a message if there are no saved gems', () => {
    wrapper.setProps({message: NO_RESULTS_MESSAGE, savedGems: []});
    expect(wrapper.find(GemInfo).length).toBe(0);
    expect(wrapper.find('.Message').length).toBe(1);
    expect(wrapper.find('.Message').text()).toEqual(NO_RESULTS_MESSAGE);
  });

}); 
