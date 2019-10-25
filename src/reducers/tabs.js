import { ACTIONS } from './../utils/constants';
import { objectPropInArray } from './../utils/tools';

export default function tabs(state = [], { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_TAB:
    {
      return [...state, payload];
    }
    case ACTIONS.REMOVE_TAB:
    {
      return [...state.filter(w => w.section !== payload.section)];
    }
    case ACTIONS.REPLACE_TAB:
    {
      const buffer = state;

      buffer[objectPropInArray(state, 'section', payload.section)] = { ...payload };

      return buffer;
    }
    default:
    {
      return state;
    }
  }
}
