/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import PetDetailsModal from './PetDetailsModal';

describe('Components - Header', () => {
  it('renders', () => {
    const petDetails = {
      name: 'Bob',
      type: 'Cat',
      feeds: 2,
    };
    const tree = renderer.create(<PetDetailsModal pet={petDetails} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('When no type is provided', () => {
    it('renders without type', () => {
      const petDetails = {
        name: 'Bob',
        feeds: 2,
      };
      const tree = renderer
        .create(<PetDetailsModal pet={petDetails} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
