import React from 'react';
import { shallow } from 'enzyme';
import Input from './index';

describe('Test Button component', () => {
	it('Test click event', () => {
		const wrapper = shallow(<Input />);
		expect(wrapper.find('input')).toExist();
	});
});