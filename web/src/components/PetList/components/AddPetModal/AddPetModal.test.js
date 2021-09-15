import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../app/store';
import AddPetModal from './AddPetModal';
import { getPets } from '../../redux/selectors';

const renderModal = ({ open }) => {
  const onRequestClose = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <AddPetModal open={open} onRequestClose={onRequestClose} />
      </Provider>
    ),
    onRequestClose,
  };
};

describe('AddPetModal', () => {
  it('should NOT display when the open is set to false', () => {
    const { queryByText } = renderModal({ open: false });

    expect(queryByText('Add your pet')).not.toBeInTheDocument();
  });

  it('should display when the open is set to open', () => {
    const { queryByText } = renderModal({ open: true });

    expect(queryByText('Add your pet')).toBeInTheDocument();
  });

  it('should allow a new user to be entered', () => {
    const { getByTestId, getByLabelText, getByText, onRequestClose } =
      renderModal({
        open: true,
      });

    fireEvent.change(getByLabelText('Pets name'), {
      target: { value: 'Dolly' },
    });
    fireEvent.change(getByLabelText('Animal type'), {
      target: { value: 'Dog' },
    });
    fireEvent.change(getByLabelText('Number of feeds'), {
      target: { value: '3' },
    });
    fireEvent.click(getByTestId('AddButton'));

    expect(getPets(store.getState())[0].name).toEqual('Dolly');
    expect(getPets(store.getState())[0].type).toEqual('Dog');
    expect(getPets(store.getState())[0].feeds).toEqual(3);

    expect(onRequestClose).toHaveBeenCalled();
  });
});
