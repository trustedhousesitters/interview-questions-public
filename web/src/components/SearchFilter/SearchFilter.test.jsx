import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SearchFilter from './SearchFilter';

test('renders and responds to input', () => {
  const handleQueryChange = vi.fn();
  const handleTypeChange = vi.fn();
  const props = {
    query: '',
    onQueryChange: handleQueryChange,
    typeOptions: ['All', 'cat', 'dog'],
    typeValue: 'All',
    onTypeChange: handleTypeChange,
  };

  render(<SearchFilter {...props} />);

  const searchInput = screen.getByLabelText(/search pets/i);
  fireEvent.change(searchInput, { target: { value: 'spot' } });
  expect(handleQueryChange).toHaveBeenCalledWith('spot');

  const selectInput = screen.getByLabelText(/filter by type/i);
  fireEvent.change(selectInput, { target: { value: 'dog' } });
  expect(handleTypeChange).toHaveBeenCalledWith('dog');

  expect(screen.getByText('All')).toBeInTheDocument();
  expect(screen.getByText('cat')).toBeInTheDocument();
  expect(screen.getByText('dog')).toBeInTheDocument();
});
