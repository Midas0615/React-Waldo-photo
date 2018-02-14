import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import pizza from './reducer/pizza';

const rootReducer = combineReducers({
  routing: routerReducer,
  pizza,
});

export default rootReducer;
