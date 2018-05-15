import { constants } from '../utils/constants';

export default function auth(state = { login: false, text: '' }, { type, payload }) {
  switch (type) {
    case constants.actions.AUTH_SUCCESS:
    {
      return {
        login: payload.login,
        text: '',
      };
    }
    case constants.actions.AUTH_ERROR:
    {
      return {
        login: false,
        text: payload.text,
      };
    }
    case constants.actions.AUTH_LOAD:
    {
      return {
        login: '',
        text: '',
      };
    }
    default:
    {
      return state;
    }
  }
}
