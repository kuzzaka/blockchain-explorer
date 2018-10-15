import React from 'react';
import { shallow } from 'enzyme';
import WithLayout from '../../components/with-layout';

test('WithLayout snapshot', () => {
  const wrapper = shallow(<WithLayout>markup</WithLayout>);
  expect(wrapper).toMatchSnapshot();
});
