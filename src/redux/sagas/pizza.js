import { put, call, takeEvery } from 'redux-saga/effects';
import {
  LIST_PIZZA_REQUEST,
  LIST_PIZZA_SUCCESS,
  LIST_PIZZA_FAILURE,
  GET_PIZZA_REQUEST,
  GET_PIZZA_SUCCESS,
  GET_PIZZA_FAILURE,
  ADD_PIZZA_REQUEST,
  ADD_PIZZA_SUCCESS,
  ADD_PIZZA_FAILURE,
  REMOVE_PIZZA_REQUEST,
  REMOVE_PIZZA_SUCCESS,
  REMOVE_PIZZA_FAILURE,
} from '../constants';

import client from '../../apolloClient';
import {
  fetchAllPizzasQuery,
  fetchPizzaByName,
} from '../../graphql/queries/pizzaQueries';

// function addValue(pizza) {
//   console.log(pizza);
// }

function* getAllPizzaSizes() {
  try {
    const response = yield call(client.query, fetchAllPizzasQuery());
    yield put({ type: LIST_PIZZA_SUCCESS, payload: response.data.pizzaSizes });
  } catch (err) {
    yield put({ type: LIST_PIZZA_FAILURE, payload: err });
  }
}

function* getPizzaSizeByName() {
  try {
    const response = yield call(client.query, fetchPizzaByName('SMALL'));
    yield put({ type: GET_PIZZA_SUCCESS, payload: response.data.pizzaSizeByName });
  } catch (err) {
    yield put({ type: GET_PIZZA_FAILURE, payload: err });
  }
}

function* addPizza({ payload: { pizza } }) {
  try {
    yield put({ type: ADD_PIZZA_SUCCESS, payload: pizza });
  } catch (err) {
    yield put({ type: ADD_PIZZA_FAILURE, payload: err });
  }
}

function* removePizza({ payload: { key } }) {
  try {
    yield put({ type: REMOVE_PIZZA_SUCCESS, payload: key });
  } catch (err) {
    yield put({ type: REMOVE_PIZZA_FAILURE, payload: err });
  }
}

export function* pizzaSaga() {
  yield [
    takeEvery(LIST_PIZZA_REQUEST, getAllPizzaSizes),
    takeEvery(GET_PIZZA_REQUEST, getPizzaSizeByName),
    takeEvery(ADD_PIZZA_REQUEST, addPizza),
    takeEvery(REMOVE_PIZZA_REQUEST, removePizza),
  ];
}
