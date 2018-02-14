import {
  LIST_PIZZA_REQUEST,
  LIST_PIZZA_SUCCESS,
  LIST_PIZZA_FAILURE,
  GET_PIZZA_REQUEST,
  GET_PIZZA_SUCCESS,
  GET_PIZZA_FAILURE,
} from '../constants';

const initialState = {
  pizzaSizes: [],
  pizzaSizeByName: {},
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
        pizzaSizes: action.payload,
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
        pizzaSizeByName: action.payload,
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
