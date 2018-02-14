import { all } from 'redux-saga/effects';
import { pizzaSaga } from './pizza';

export default function* rootSaga() {
  yield all([
    pizzaSaga(),
  ]);
}
