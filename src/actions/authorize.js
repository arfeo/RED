import { push } from 'react-router-redux';

import { auhtorizeApi } from './../api/authorize';
import { constants } from './../utils/constants';

export const authorizeAction = params => async (dispatch) => {
  dispatch({ type: constants.actions.AUTH_LOAD });

  const response = await auhtorizeApi(params);

  if (response.data.success) {
    dispatch({
      type: constants.actions.AUTH_LOGIN,
      payload: { login: params.login },
    });

    dispatch(push('/'));

    return Promise.resolve();
  }

  dispatch({
    type: constants.actions.AUTH_ERROR,
  });

  return Promise.reject();
};
