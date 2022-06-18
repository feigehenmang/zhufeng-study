import { ADD, MINUS } from "../types";

export default function countReducer(state = { number: 0 }, action) {
  switch (action.type) {
    case ADD:
      return { ...state, number: state.number + 1 };
    case MINUS:
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
}
