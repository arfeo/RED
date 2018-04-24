import { constants } from '../utils/constants';
const defState = {
  active: false,
  items: [
    {
      name: 'Item-1',
      click: () => { console.log('click'); },
    },
  ],
  x: 20,
  y: 20,
};
let block = false;
export default function context(state = defState, { type, payload }) {
  switch (type) {
    case constants.actions.SET_CONTEXT: {
      setTimeout(() => {
        block = false;
      }, 100);
      if (block) { return state; }

      block = true;
      return payload;
    }
    case constants.actions.CLEAR_CONTEXT: {
      return defState;
    }
    default: {
      return state;
    }
  }
}
