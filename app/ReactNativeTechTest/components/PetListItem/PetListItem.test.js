/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import PetListItem from './PetListItem';

describe('Components - PetListItem', () => {
  it('renders - light mode', () => {
    const tree = renderer
      .create(
        <PetListItem
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
