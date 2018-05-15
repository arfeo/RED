import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from './../../../Icon/Icon';
import { uuid } from './../../../../utils/tools';
import { constants } from './../../../../utils/constants';

import './DockHomeMenu.scss';

class DockHomeMenu extends Component {
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

  render() {
    const { home } = this.props;

    return (
      <div className={`DockHomeMenu ${home === false ? 'hidden' : ''}`}>
        <ul>
          {this.drawSections('user')}
          <li><hr /></li>
          {this.drawSections('service')}
        </ul>
      </div>
    );
  }
}

DockHomeMenu.propTypes = {
  home: PropTypes.bool,
  sections: PropTypes.array,
  windows: PropTypes.array,
  openWindow: PropTypes.func,
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
  }),
)(DockHomeMenu);
