import { ACTIONS } from '../utils/constants';

export default function home(state = false, { type, payload }) {
  switch (type) {
    case ACTIONS.TOGGLE_HOME_MENU:
    {
      return payload;
    }
    default:
    {
      return state;
    }
  }
}
