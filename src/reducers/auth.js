import { constants } from './../utils/constants';

export default function auth(state = { login: false, errorText: '' }, { type, payload }) {
  switch (type) {
    case constants.actions.AUTH_SUCCESS:
    {
      return {
        login: payload.login,
        errorText: '',
      };
    }
    case constants.actions.AUTH_ERROR:
    {
      return {
        login: false,
        errorText: payload.errorText,
      };
    }
    case constants.actions.AUTH_LOAD:
    {
      return {
        login: '',
        errorText: '',
      };
    }
    default:
    {
      return state;
    }
  }
}
