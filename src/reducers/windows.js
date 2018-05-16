import { constants } from './../utils/constants';

export default function windows(state = [], { type, payload }) {
  switch (type) {
    case constants.actions.OPEN_WINDOW:
    case constants.actions.MINIMIZE_WINDOW:
    case constants.actions.MAXIMIZE_WINDOW:
    case constants.actions.DRAG_WINDOW:
    case constants.actions.RESIZE_WINDOW:
    {
      return [...state.filter(w => w.section !== payload.section), payload];
    }
    case constants.actions.CLOSE_WINDOW:
    {
      return [...state.filter(w => w.section !== payload.section)];
    }
    default:
    {
      return state;
    }
  }
}
