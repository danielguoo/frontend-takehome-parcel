import React from "react";
import renderer from 'react-test-renderer';
import GemsSearchPage from './index';

describe('GemsSearchPage', () => {
  it('snapshot renders', () => {
    const component = renderer.create(<GemsSearchPage/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
}); 