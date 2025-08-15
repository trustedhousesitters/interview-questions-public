import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PetList from './PetList';
import { vi } from 'vitest';

vi.mock('../PetItem/PetItem', () => ({
  default: ({ pet }) => <div>{pet.name}</div>,
}));

vi.mock('../SearchFilter/SearchFilter', () => ({
  default: (props) => (
    <div>
      <input
        data-testid="search-input"
        value={props.query}
        onChange={(e) => props.onQueryChange(e.target.value)}
      />
      <select
        data-testid="type-select"
        value={props.typeValue}
        onChange={(e) => props.onTypeChange(e.target.value)}
      >
        {props.typeOptions.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  ),
}));

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 1, name: 'Fluffy', type: 'cat', feeds: 2, icon: '/fluffy.png' },
          { id: 2, name: 'Spot', type: 'dog', feeds: 3, icon: '/spot.png' },
        ]),
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('renders pets on success', async () => {
  render(<PetList />);
  await waitFor(() => expect(screen.getByText('Fluffy')).toBeInTheDocument());
  expect(screen.getByText('Spot')).toBeInTheDocument();
});

test('shows loading and then success', async () => {
  render(<PetList />);
  expect(screen.getByRole('status')).toHaveTextContent(/loading/i);
  await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
});

test('handles error state', async () => {
  global.fetch = vi.fn(() => Promise.reject(new Error('API down')));
  render(<PetList />);
  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/couldn’t load/i));
});

test('filters by search query', async () => {
  render(<PetList />);
  await waitFor(() => screen.getByText('Fluffy'));
  fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'fluff' } });
  expect(screen.getByText('Fluffy')).toBeInTheDocument();
  expect(screen.queryByText('Spot')).toBeNull();
});

test('filters by type', async () => {
  render(<PetList />);
  await waitFor(() => screen.getByText('Fluffy'));
  fireEvent.change(screen.getByTestId('type-select'), { target: { value: 'cat' } });
  expect(screen.getByText('Fluffy')).toBeInTheDocument();
  expect(screen.queryByText('Spot')).toBeNull();
});
