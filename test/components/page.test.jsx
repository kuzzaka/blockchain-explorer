import React from 'react';
import { shallow } from 'enzyme';
import Page from '../../components/page';

test('Page snapshot', () => {
  const wrapper = shallow(<Page title="My Title" />);
  expect(wrapper).toMatchSnapshot();
});
