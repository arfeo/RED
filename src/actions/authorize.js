import { push } from 'react-router-redux';
import { auhtorizeApi } from '../api/authorize';
import { constants } from '../utils/constants';

export const authorizeAction = params => async (dispatch) => {
  dispatch({ type: constants.actions.AUTH_LOAD });
  try {
    const response = await auhtorizeApi(params);
    if (response.data.success) {
      dispatch({
        type: constants.actions.AUTH_SUCCESS,
        payload: { login: params.login },
      });
      setTimeout(dispatch(push('/desktop')), 300);
    } else {
      console.log('error');
      dispatch({ type: constants.actions.AUTH_ERROR, payload: { text: 'Login or password is wrong!' } });
    }
  } catch (e) {
    console.log(e);
  }
};
