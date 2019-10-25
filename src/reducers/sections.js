import { ACTIONS } from './../utils/constants';
import { saveData } from './../utils/storage';

export default function sections(state = [], { type, payload }) {
  switch (type) {
    case ACTIONS.RENAME_SECTION:
    {
      const newState = [...state.filter(s => s.type !== payload.type), payload];

      saveData('sections', JSON.stringify(newState));

      return newState;
    }
    default:
    {
      return state;
    }
  }
}
