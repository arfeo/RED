import { push } from 'react-router-redux';

import { authorizeApi } from '../api/authorize';

import { ACTIONS } from '../utils/constants';

export const authorizeAction = params => async (dispatch) => {
  dispatch({ type: ACTIONS.AUTH_LOAD });

  const response = await authorizeApi(params);

  if (response.data.success) {
    dispatch({
      type: ACTIONS.AUTH_LOGIN,
      payload: { login: params.login },
    });

    dispatch(push('/'));

    return Promise.resolve();
  }

  dispatch({
    type: ACTIONS.AUTH_ERROR,
  });

  return Promise.reject();
};
