import { constants } from '../utils/constants';

export default function home(state = false, { type, payload }) {
  switch (type) {
    case constants.actions.TOGGLE_HOME_MENU:
    {
      return payload;
    }
    default:
    {
      return state;
    }
  }
}
