import React from 'react';
import { configure, shallow } from 'enzyme';
import GemInfo from './index';
import { MdStar, MdStarBorder } from "react-icons/md";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const gem = {
  name: 'testGem',
  version: '1.0',
  info: 'This is a test gem',
}

describe('GemInfo Component', () => {
  const toggleSaveGem = jest.fn();
  const wrapper = shallow(<GemInfo toggleSaveGem={toggleSaveGem} isSaved={false} gem={gem} />);

  it('should render a GemInfo component', () => {
    expect(wrapper.find('.GemInfo').length).toBe(1);
  })
  it('should contain the Gem name, version, and description on the left', () => {
    expect(wrapper.find('.GemName').text()).toEqual('testGem');
    expect(wrapper.find('.LeftBlock').childAt(0).childAt(1).text()).toEqual('1.0')
    expect(wrapper.find('.LeftBlock').childAt(1).text()).toEqual('This is a test gem');
  });

  it('should render an unfilled start when not saved', () => {
    expect(wrapper.find(MdStarBorder).length).toBe(1);
  });
  it('should render a filled star when clicked', () => {
    wrapper.find('.RightBlock').childAt(0).simulate('click');
    expect(toggleSaveGem).toBeCalled();
    wrapper.setProps({isSaved: true})
    expect(wrapper.find(MdStar).length).toBe(1);
  })

}); 
