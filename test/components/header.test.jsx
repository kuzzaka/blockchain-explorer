import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/header';

test('Header snapshot', () => {
  const wrapper = shallow(<Header title="My Title" />);
  expect(wrapper).toMatchSnapshot();
});
