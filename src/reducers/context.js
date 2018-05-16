import { constants } from './../utils/constants';

const initState = {
  active: false,
  items: [],
  x: 20,
  y: 20,
};

let block = false;

export default function context(state = initState, { type, payload }) {
  switch (type) {
    case constants.actions.SET_CONTEXT:
    {
      setTimeout(() => {
        block = false;
      }, 100);

      if (block) {
        return state;
      }

      block = true;

      return payload;
    }
    case constants.actions.CLEAR_CONTEXT:
    {
      return initState;
    }
    default:
    {
      return state;
    }
  }
}
