import React from 'react';
import { test } from 'ava';

import I18n from '../index';

const { expect, shallow, mount } = testHelper;

const TestComponent = () => <div id="test-component" />;

test('renders its children', () => {
  const component = (
    <I18n>
      <TestComponent />
    </I18n>
  );
  const wrapper = mount(component);
  expect(wrapper.find('#test-component').length).toEqual(1);
});

test('renders an IntlProvider component with the given locale and messages', () => {
  const locale = 'the locale';
  const messages = { my: 'message' };
  const component = (
    <I18n locale={locale} messages={messages}>
      <TestComponent />
    </I18n>
  );
  const wrapper = shallow(component);

  const intlProvider = wrapper.find('IntlProvider');
  expect(intlProvider.length).toEqual(1);
  expect(intlProvider.props().locale).toEqual(locale);
  expect(intlProvider.props().messages).toEqual(messages);
});
