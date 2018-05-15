import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Icon from './../../../Icon/Icon';
import { constants } from './../../../../utils/constants';

import './DockHomeButton.scss';

const DockHomeButton = (props) => {
  const {
    home,
    onToggleHomeMenu,
  } = props;

  return (
    <div className={`DockHomeButton ${home !== false ? 'active' : ''}`}>
      <Icon
        iconType={home === false ? 'menu4' : 'menu3'}
        iconSize="small"
        iconColor={home === false ? 'white' : ''}
        iconTitle="Menu"
        onClick={() => { onToggleHomeMenu(!home); }}
      />
    </div>
  );
};

DockHomeButton.propTypes = {
  home: PropTypes.bool,
  onToggleHomeMenu: PropTypes.func,
};

export default connect(
  state => ({
    home: state.home,
  }),
  dispatch => ({
    onToggleHomeMenu: (payload) => {
      dispatch({ type: constants.actions.TOGGLE_HOME_MENU, payload });
    },
  }),
)(DockHomeButton);
