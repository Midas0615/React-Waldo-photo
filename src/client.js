import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import configureStore from 'redux/store';
import I18n from 'components/I18n';
import 'styles/app.scss';

import Router from 'router';

const initialState = fromJS({});
const store = configureStore(initialState);

render(
  <AppContainer warnings={false}>
    <Provider store={store}>
      <I18n>
        <Router />
      </I18n>
    </Provider>
  </AppContainer>,
  document.getElementById('root'),
);
