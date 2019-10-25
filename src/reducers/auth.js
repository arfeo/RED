import { ACTIONS } from '../utils/constants';
import { getData, saveData } from '../utils/storage';

const initState = {
  login: getData('login') || '',
};

export default function auth(state = initState, { type, payload }) {
  switch (type) {
    case ACTIONS.AUTH_LOGIN:
    {
      saveData('login', payload.login);

      return {
        login: payload.login,
      };
    }
    case ACTIONS.AUTH_ERROR:
    case ACTIONS.AUTH_LOAD:
    {
      return state;
    }
    case ACTIONS.AUTH_LOGOUT:
    {
      saveData('login', '');

      return { login: '' };
    }
    default:
    {
      return state;
    }
  }
}
