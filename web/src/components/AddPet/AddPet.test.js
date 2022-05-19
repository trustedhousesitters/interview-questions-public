import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { AddPet } from './AddPet';
import { store } from '../../app/store';

describe('<AddPet />', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <AddPet />
      </Provider>
    );
  });

  it('should render correctly', () => {
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of feeds')).toBeInTheDocument();
  });
});
