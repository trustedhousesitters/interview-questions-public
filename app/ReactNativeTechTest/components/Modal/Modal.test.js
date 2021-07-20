/* eslint-env jest */
import React from 'react';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';

import Modal from './Modal';

describe('Components - Modal', () => {
  it('renders - modal', () => {
    const tree = renderer
      .create(
        <Modal>
          <Text>Dummy text</Text>
        </Modal>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
