/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import * as redux from 'react-redux';

import App from '../App';

describe('Components - App', () => {
  it('renders - light mode', () => {
    const reduxSpy = jest.spyOn(redux, 'useSelector');
    const spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    spyOnUseDispatch.mockReturnValue(null);
    const pets = [
      { id: 0, name: 'Mr. Fluffings', type: 'Dog', feeds: 2 },
      { id: 1, name: 'The Whiskertron', type: 'Cat', feeds: 3 },
      { id: 2, name: 'Dogbert', type: 'Dog', feeds: 3 }
    ];
    reduxSpy.mockReturnValue(pets);
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(spyOnUseDispatch).toHaveBeenCalled();
    expect(tree).toMatchSnapshot();
  });
});
