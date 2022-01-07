import React from 'react';
import { shallow } from 'enzyme';
import Button from './index';

describe('Test Button component', () => {
	it('Test click event', () => {
		const mockCallBack = jest.fn();

		const button = shallow((<Button onClick={mockCallBack}>Button</Button>));
		button.find('btn').simulate('click');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	});
});