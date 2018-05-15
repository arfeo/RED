import { push } from 'react-router-redux';

import { auhtorizeApi } from './../api/authorize';
import { constants } from './../utils/constants';

export const authorizeAction = params => async (dispatch) => {
  dispatch({ type: constants.actions.AUTH_LOAD });

  const response = await auhtorizeApi(params);

  if (response.data.success) {
    dispatch({
      type: constants.actions.AUTH_SUCCESS,
      payload: { login: params.login },
    });

    dispatch(push('/desktop'));

    return Promise.resolve();
  }

  dispatch({
    type: constants.actions.AUTH_ERROR,
    payload: { errorText: 'Login or password is wrong!' },
  });

  return Promise.reject();
};
