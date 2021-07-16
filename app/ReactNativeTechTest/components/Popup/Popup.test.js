/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import * as redux from 'react-redux';

import {Popup} from './Popup';

describe('Components - Popup', () => {
  const spy = jest.spyOn(redux, 'useSelector');
  spy.mockReturnValue([
    {
      name: 'Bowser',
      type: 'Rottweiler',
      feeds: 4,
      id: 1,
    },
  ]);
  it('renders - light mode', () => {
    const tree = renderer.create(<Popup id={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
