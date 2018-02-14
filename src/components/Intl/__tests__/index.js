import React from 'react';
import { test } from 'ava';
import { noop } from 'lodash';

import { injectIntl } from '../index';

const { expect, shallow, createSpy } = testHelper;

const testProps = {
  intl: { formatMessage: noop },
};

const TestComponent = () => <div id="test-component" />;

const shallowRenderer = (props = testProps) => {
  const Component = injectIntl(TestComponent, true);
  return shallow(<Component {...props} />);
};

test('renders TestComponent', () => {
  const component = shallowRenderer();
  expect(component).toBeA('TestComponent');
});

test('has right prop formatMessage.', () => {
  const formatSpy = createSpy();
  const testId = 'test message id';
  const component = shallowRenderer({
    ...testProps,
    intl: { formatMessage: formatSpy },
  });
  component.props().formatMessage(testId);
  expect(formatSpy).toHaveBeenCalled();
});
