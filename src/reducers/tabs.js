import { constants } from './../utils/constants';
import { objectPropInArray } from './../utils/tools';

export default function tabs(state = [], { type, payload }) {
  switch (type) {
    case constants.actions.ADD_TAB:
    {
      return [...state, payload];
    }
    case constants.actions.REMOVE_TAB:
    {
      return [...state.filter(w => w.section !== payload.section)];
    }
    case constants.actions.REPLACE_TAB:
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
