import { constants } from './../utils/constants';

export default function theme(state = { bg: '#fff' }, { type, payload }) {
  switch (type) {
    case constants.actions.SET_BG: {
      return { bg: payload };
    }
    default: {
      return state;
    }
  }
}
