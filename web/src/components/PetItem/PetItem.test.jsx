import React from 'react';
import { render, screen } from '@testing-library/react';
import PetItem from './PetItem';

test('renders pet details', () => {
  const pet = {
    name: 'Buddy',
    type: 'dog',
    feeds: 4,
    icon: '/buddy.png',
  };

  render(<PetItem pet={pet} />);

  expect(screen.getByAltText('pet')).toHaveAttribute('src', '/buddy.png');
  expect(screen.getByText(/Name:/i)).toBeInTheDocument();
  expect(screen.getByText('Buddy')).toBeInTheDocument();
  expect(screen.getByText(/Animal Type:/i)).toBeInTheDocument();
  expect(screen.getByText('dog')).toBeInTheDocument();
  expect(screen.getByText(/Number of feeds:/i)).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
});
