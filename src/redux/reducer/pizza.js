import _ from 'lodash';
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

const initialState = {
  pizzaSizes: [],
  pizzaSizeByName: {},
  orderedPizzas: [],
};

export default function pizza(state = initialState, action) {
  switch (action.type) {
    case LIST_PIZZA_REQUEST:
      return {
        ...state,
      };
    case LIST_PIZZA_SUCCESS:
      return {
        ...state,
        pizzaSizes: action.payload,
      };
    case LIST_PIZZA_FAILURE:
      return {
        ...state,
      };
    case GET_PIZZA_REQUEST:
      return {
        ...state,
      };
    case GET_PIZZA_SUCCESS:
      return {
        ...state,
        pizzaSizeByName: action.payload,
      };
    case GET_PIZZA_FAILURE:
      return {
        ...state,
      };
    case ADD_PIZZA_REQUEST:
      return {
        ...state,
      };
    case ADD_PIZZA_SUCCESS:
      const updatedPizza = state.orderedPizzas;
      updatedPizza.push(action.payload);
      return {
        ...state,
        orderedPizzas: updatedPizza,
      };
    case ADD_PIZZA_FAILURE:
      return {
        ...state,
      };
    case REMOVE_PIZZA_REQUEST:
      return {
        ...state,
      };
    case REMOVE_PIZZA_SUCCESS:
      const removedPizza = state.orderedPizzas;
      _.remove(removedPizza, currentObject => currentObject.key === action.payload);
      return {
        ...state,
        orderedPizzas: removedPizza,
      };
    case REMOVE_PIZZA_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
