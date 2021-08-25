/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import PetModal from './PetModal';

describe('Components - PetModal', () => {
  it('renders - light mode', () => {
    const petObject = {
      name: 'Bowser',
      type: 'Rottweiler',
      feeds: 4,
      id: 1,
    };
    const tree = renderer
      .create(<PetModal isVisible={true} pet={petObject} />)
      .toJSON();
    expect(tree).toMatchSnapshot();

    const modalHiddenTree = renderer
      .create(<PetModal isVisible={false} pet={petObject} />)
      .toJSON();
    expect(modalHiddenTree).toMatchInlineSnapshot(`null`);
  });
});
