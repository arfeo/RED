import { constants } from './../utils/constants';
import { getData, saveData } from './../utils/storage';

const initState = {
  login: getData('login') || '',
};

export default function auth(state = initState, { type, payload }) {
  switch (type) {
    case constants.actions.AUTH_SUCCESS:
    {
      saveData('login', payload.login);

      return {
        login: payload.login,
      };
    }
    case constants.actions.AUTH_ERROR:
    case constants.actions.AUTH_LOAD:
    {
      return state;
    }
    default:
    {
      return state;
    }
  }
}
