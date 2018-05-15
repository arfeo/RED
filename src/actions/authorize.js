import { push } from 'react-router-redux';

import { auhtorizeApi } from './../api/authorize';
import { constants } from './../utils/constants';

export const authorizeAction = params => async (dispatch) => {
  const response = await auhtorizeApi(params);

  dispatch({ type: constants.actions.AUTH_LOAD });

  if (response.data.success) {
    dispatch({
      type: constants.actions.AUTH_SUCCESS,
      payload: { login: params.login },
    });

    setTimeout(dispatch(push('/desktop')), 300);
  } else {
    dispatch({
      type: constants.actions.AUTH_ERROR,
      payload: {
        text: 'Login or password is wrong!',
      },
    });
  }
};
