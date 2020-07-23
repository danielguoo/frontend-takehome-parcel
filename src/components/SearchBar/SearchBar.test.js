import React from "react";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from './index';

configure({ adapter: new Adapter() });

describe('Search Bar', () => {
  const testState = { searchValue: '' }
  const wrapper = mount((
    <SearchBar
      searchValue={testState.searchValue}
      handleChange={(e) => {
        testState.searchValue = e.target.value;
      }}
    />
  ));

  it('should update the search input when the user types', () => {
    wrapper.find('input').at(0).simulate('change', { target: { value: 'hello'}});
    expect(testState.searchValue).toBe('hello');
  });
});