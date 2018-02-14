import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import PizzaView from '../index';

const { expect, shallow } = testHelper;
const testProps = {
  formatMessage: noop,
};
const shallowRenderer = (props = testProps) =>
  shallow(<PizzaView {...props} />);

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component).toBeA('div');
});
