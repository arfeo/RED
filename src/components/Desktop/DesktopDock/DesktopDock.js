import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DockHomeButton from './DockHomeButton/DockHomeButton';
import DockHomeMenu from './DockHomeMenu/DockHomeMenu';
import DockActiveWindows from './DockTabs/DockTabs';

import { ACTIONS } from './../../../utils/constants';

import './DesktopDock.scss';

const DesktopDock = (props) => {
  const {
    home,
    openWindow,
    onToggleHomeMenu,
  } = props;

  const clickHandler = () => {
    if (home) {
      onToggleHomeMenu(false);
    }
  };

  return (
    <div className="DesktopDock" onClick={clickHandler}>
      <DockHomeButton />
      <DockHomeMenu openWindow={openWindow} />
      <DockActiveWindows />
    </div>
  );
};

DesktopDock.propTypes = {
  home: PropTypes.bool,
  openWindow: PropTypes.func,
  onToggleHomeMenu: PropTypes.func,
};

export default connect(
  state => ({
    home: state.home,
  }),
  dispatch => ({
    onToggleHomeMenu: (payload) => {
      dispatch({ type: ACTIONS.TOGGLE_HOME_MENU, payload });
    },
  }),
)(DesktopDock);
