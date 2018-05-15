import { put, takeLatest } from 'redux-saga/effects';

import { constants } from './../utils/constants';

export default function* setTheme() {
  yield takeLatest(constants.actions.SET_THEME, setBackground);
}

function* setBackground(theme = '#fff') {
  yield put({ type: constants.actions.SET_BG, payload: theme.payload });
}
