import React from 'react';
import { configure, mount } from 'enzyme';
import SavedGemsList from './index';
import GemInfo from '../GemInfo';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const saved = {
  testGem: {
    name: 'testGem',
    version: '1.0',
    info: 'This is a test gem',
  },
};

const NO_GEMS_SAVED_MESSAGE = 'Search and save for gems to see them appear here.';

describe('GemInfo Component', () => {
  const toggleSaveGem = jest.fn();
  const wrapper = mount(<SavedGemsList toggleSaveGem={toggleSaveGem} savedGems={saved} />);

  it('render a GemInfo if there are saved gems', () => {
    expect(wrapper.find(GemInfo).length).toBe(1);
  });

  it('should display a message if there are no saved gems', () => {
    wrapper.setProps({savedGems: {}});
    expect(wrapper.find('.Message').length).toBe(1);
    expect(wrapper.find('.Message').text()).toEqual(NO_GEMS_SAVED_MESSAGE);
  });
}); 
