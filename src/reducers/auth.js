import { constants } from './../utils/constants';

export default function auth(state = { login: '' }, { type, payload }) {
  switch (type) {
    case constants.actions.AUTH_SUCCESS:
    {
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
