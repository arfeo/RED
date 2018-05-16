import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';

import Icon from './../../../Icon/Icon';
import DialogModal from './../../../DialogModal/DialogModal';
import { uuid } from './../../../../utils/tools';
import { constants } from './../../../../utils/constants';

import './DockHomeMenu.scss';

class DockHomeMenu extends Component {
  state = {
    isLogOutConfirm: false,
  }

  drawSections = (mode) => {
    return this.props.sections.map((section) => {
      if (section.mode === mode) {
        return (
          <li key={uuid()}>
            <div
              onClick={() => {
                const win = this.props.windows.filter(w => w.section === section.type)[0] || {
                  ...constants.windowObject,
                  key: uuid(),
                  section: section.type,
                };

                this.props.openWindow(win);
              }}
            >
              <Icon iconType={section.icon} />{' '}{section.title}
            </div>
          </li>
        );
      }

      return false;
    });
  }

  toggleLogOut = () => {
    if (this.state.isLogOutConfirm === false) {
      this.props.onToggleHomeMenu(false);
    }

    this.setState({
      isLogOutConfirm: !this.state.isLogOutConfirm,
    });
  }

  render() {
    const { home } = this.props;

    return (
      <div className={`DockHomeMenu ${home === false ? 'hidden' : ''}`}>
        <ul>
          {this.drawSections('user')}
          <li><hr /></li>
          {this.drawSections('service')}
          <li><hr /></li>
          <li>
            <div onClick={this.toggleLogOut}>
              <Icon iconType="switch" />
              {'Log out'}
            </div>
          </li>
        </ul>
        <DialogModal
          isOpened={this.state.isLogOutConfirm}
          isBackdrop={!!true}
          className="modal-md"
          confirmTitle="Log out"
          confirmContent="Are you sure you want to log out?"
          onToggle={this.toggleLogOut}
          onConfirm={this.props.onLogOut}
          continueText="Log out"
        />
      </div>
    );
  }
}

DockHomeMenu.propTypes = {
  home: PropTypes.bool,
  sections: PropTypes.array,
  windows: PropTypes.array,
  openWindow: PropTypes.func,
  onToggleHomeMenu: PropTypes.func,
  onLogOut: PropTypes.func,
};

export default connect(
  state => ({
    home: state.home,
    sections: state.sections,
    windows: state.windows,
  }),
  dispatch => ({
    onToggleHomeMenu: (payload) => {
      dispatch({ type: constants.actions.TOGGLE_HOME_MENU, payload });
    },
    onLogOut: () => {
      dispatch({ type: constants.actions.AUTH_LOGOUT });
      dispatch(push('/'));
    },
  }),
)(DockHomeMenu);
