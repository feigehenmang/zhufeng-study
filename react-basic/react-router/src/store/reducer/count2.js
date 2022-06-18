import { ADD2, MINUS2 } from "../types";

export default function countReducer(state = { number: 0 }, action) {
  switch (action.type) {
    case ADD2:
      return { ...state, number: state.number + 1 };
    case MINUS2:
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
}
