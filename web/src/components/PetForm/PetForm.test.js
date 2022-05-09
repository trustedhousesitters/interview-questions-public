import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import PetForm, { ADD_PET_TEST_ID } from './PetForm';
import { addPet } from '../PetList/actions';



jest.mock('../PetList/actions', () => ({
    ...jest.requireActual('../PetList/actions'),
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


test('renders PetForm title', async() => {
    const { getByRole } = render(
        <Router>
            <Provider store={store}>
                <PetForm />
            </Provider>
        </Router>
    );
      
    await wait(()=> expect(getByRole('heading')).toHaveTextContent('New Pet'))
    
});


test('Name Input is in the document and changes', async () => {
    render(<Router>
        <Provider store={store}>
            <PetForm/>
        </Provider>
    </Router> )

    const input = screen.getByLabelText("Name")
    userEvent.type(input, 'Ollie')
    expect(screen.getByLabelText('Name')).toHaveValue('Ollie');
  }
)

// test('Dispatch action', () => {
//     render(<Router>
//         <Provider store={store}>
//             <PetForm/>
//         </Provider>
//     </Router> )
//     const mockedAddPet = jest.fn();
//     addPet.mockReturnValue(mockedAddPet)
//     const input = screen.getByLabelText("Name")
//     userEvent.type(input, 'Ollie')
//     userEvent.click(screen.getByTestId(ADD_PET_TEST_ID))
//     expect(mockedAddPet).toHaveBeenCalled();

//   })




  
