import { put, call, takeEvery } from 'redux-saga/effects';
import {
  LIST_PIZZA_REQUEST,
  LIST_PIZZA_SUCCESS,
  LIST_PIZZA_FAILURE,
  GET_PIZZA_REQUEST,
  GET_PIZZA_SUCCESS,
  GET_PIZZA_FAILURE,
} from '../constants';

import client from '../../apolloClient';
import {
  fetchAllPizzasQuery,
  fetchPizzaByName,
} from '../../graphql/queries/pizzaQueries';

function* listPizzas() {
  try {
    const response = yield call(client.query, fetchAllPizzasQuery());
    yield put({ type: LIST_PIZZA_SUCCESS, payload: response.data.pizzaSizes });
  } catch (err) {
    yield put({ type: LIST_PIZZA_FAILURE, payload: err });
  }
}

function* getPizzaBySize() {
  try {
    const response = yield call(client.query, fetchPizzaByName('MEDIUM'));
    console.log(response.data);
    yield put({ type: GET_PIZZA_SUCCESS, payload: response.data.pizzaSizeByName });
  } catch (err) {
    yield put({ type: GET_PIZZA_FAILURE, payload: err });
  }
}

export function* pizzaSaga() {
  yield [
    takeEvery(LIST_PIZZA_REQUEST, listPizzas),
    takeEvery(GET_PIZZA_REQUEST, getPizzaBySize),
  ];
}
