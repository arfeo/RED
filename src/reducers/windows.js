import { ACTIONS } from './../utils/constants';

export default function windows(state = [], { type, payload }) {
  switch (type) {
    case ACTIONS.OPEN_WINDOW:
    case ACTIONS.MINIMIZE_WINDOW:
    case ACTIONS.MAXIMIZE_WINDOW:
    case ACTIONS.DRAG_WINDOW:
    case ACTIONS.RESIZE_WINDOW:
    {
      return [...state.filter(w => w.section !== payload.section), payload];
    }
    case ACTIONS.CLOSE_WINDOW:
    {
      return [...state.filter(w => w.section !== payload.section)];
    }
    default:
    {
      return state;
    }
  }
}
