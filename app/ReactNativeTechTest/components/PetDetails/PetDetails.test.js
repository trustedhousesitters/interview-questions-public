/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import PetDetails from './PetDetails';

describe('Components - PetDetails', () => {
  it('renders - light mode', () => {
    const tree = renderer
      .create(
        <PetDetails
          pet={{
            name: 'Bowser',
            type: 'Rottweiler',
            feeds: 4,
            id: 1,
          }}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
