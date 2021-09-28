import React from 'react';
import { render } from "@testing-library/react";
import Modal from './Modal';
import userEvent from "@testing-library/user-event";

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: el => el,
}));

const testContent = (
  <div />
);

test('Do not render modal if visible prop is false', () => {
  const { queryByTestId } = render(
    <Modal visible={false} />
  );
  expect(queryByTestId('modal')).toBeNull();
});

test('Render modal if visible prop is true', () => {
  const { queryByTestId } = render(
    <Modal visible>
      {() => testContent}
    </Modal>
  );
  expect(queryByTestId('modal')).toBeInTheDocument();
});

test('Call hideModal prop on screen click', () => {
  const hideModal = jest.fn();
  const { getByTestId } = render(
    <Modal visible hideModal={hideModal}>
      {() => testContent}
    </Modal>
  );
  userEvent.click(getByTestId('modal_screen'));
  expect(hideModal).toHaveBeenCalledTimes(1);
});

test('Render cancel button by default', () => {
  const { queryByTestId } = render(
    <Modal visible>
      {footer => footer}
    </Modal>
  );
  expect(queryByTestId('modal_cancel')).toBeInTheDocument();
});


test('Hide cancel button if showCancel prop is false', () => {
  const { queryByTestId } = render(
    <Modal visible showCancel={false}>
      {footer => footer}
    </Modal>
  );
  expect(queryByTestId('modal_cancel')).toBeNull();
});

test('Render confirm button by default', () => {
  const { queryByTestId } = render(
    <Modal visible>
      {footer => footer}
    </Modal>
  );
  expect(queryByTestId('modal_confirm')).toBeInTheDocument();
});

test('Hide confirm button if showCancel prop is false', () => {
  const { queryByTestId } = render(
    <Modal visible showConfirm={false}>
      {footer => footer}
    </Modal>
  );
  expect(queryByTestId('modal_confirm')).toBeNull();
});
