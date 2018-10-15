import React from 'react';
import { mount, shallow } from 'enzyme';
import Summary from '../../components/summary';
import createStore from '../../redux/store';
import summaryData from '../stubs/summary-data';

test('Summary', () => {
  const store = createStore(summaryData);
  const wrapper = mount(<Summary store={store} />);
  expect(wrapper.find('details')).toExist();
  expect(wrapper.find('summary')).toExist();
});

test('normal Summary snapshot', () => {
  const wrapper = shallow(<Summary store={createStore(summaryData)} />);
  expect(wrapper).toMatchSnapshot();
});

test('without hash Summary snapshot', () => {
  const stateWithoutHash = { ...summaryData, ...{ hash: '' } };
  const wrapper = shallow(<Summary store={createStore(stateWithoutHash)} />);
  expect(wrapper).toMatchSnapshot();
});
