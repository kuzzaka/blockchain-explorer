import React from 'react';
import { mount, shallow } from 'enzyme';
import Button from '../../components/button';

const onClick = jest.fn();

test('Button', () => {
  const wrapper = mount(<Button onClick={onClick}>click me</Button>);
  expect(wrapper.find('button')).toExist();
  wrapper.find('button').simulate('click');
  expect(onClick).toHaveBeenCalled();
});

test('Button snapshot', () => {
  const wrapper = shallow(<Button onClick={onClick}>click me</Button>);
  expect(wrapper).toMatchSnapshot();
});
