import {
  LIST_PIZZA_REQUEST,
  LIST_PIZZA_SUCCESS,
  LIST_PIZZA_FAILURE,
  GET_PIZZA_REQUEST,
  GET_PIZZA_SUCCESS,
  GET_PIZZA_FAILURE,
} from '../constants';

const initialState = {
  pizzas: [],
  pizzaSize: {},
  pizzasRequesting: false,
};

export default function pizza(state = initialState, action) {
  switch (action.type) {
    case LIST_PIZZA_REQUEST:
      return {
        ...state,
        pizzasRequesting: true,
      };
    case LIST_PIZZA_SUCCESS:
      return {
        ...state,
        pizzas: action.payload,
        pizzasRequesting: false,
      };
    case LIST_PIZZA_FAILURE:
      return {
        ...state,
        pizzasRequesting: false,
      };
    case GET_PIZZA_REQUEST:
      return {
        ...state,
        pizzasRequesting: true,
      };
    case GET_PIZZA_SUCCESS:
      return {
        ...state,
        pizzaSize: action.payload,
        pizzasRequesting: false,
      };
    case GET_PIZZA_FAILURE:
      return {
        ...state,
        pizzasRequesting: false,
      };
    default:
      return state;
  }
}
