import React from 'react';
import { configure, shallow } from 'enzyme';
import Toggle from './index';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Toggle Component', () => {
  const toggleSearchView = jest.fn();
  const toggle = shallow(<Toggle toggleSearchView={toggleSearchView} searchView={true} />);

  it('should render a Toggle component', () => {
    expect(toggle.find('.Toggle').length).toBe(1);
  })
  it('underlines the Search Results button when in search view', () => {
    expect(toggle.find('.Toggle').childAt(0).hasClass('Selected')).toEqual(true);
    expect(toggle.find('.Toggle').childAt(1).hasClass('Selected')).toEqual(false);
  });

  it('underlines the Saved Gems button after it is clicked', () => {
    toggle.find('.Toggle').childAt(1).simulate('click');
    expect(toggleSearchView).toBeCalled();
    toggle.setProps({searchView: false})
    expect(toggle.find('.Toggle').childAt(0).hasClass('Selected')).toEqual(false);
    expect(toggle.find('.Toggle').childAt(1).hasClass('Selected')).toEqual(true);
  })

}); 
