import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DesktopIcon from './../DesktopIcon/DesktopIcon';
import { constants } from '../../../utils/constants';
import { uuid, sortArray } from './../../../utils/tools';

import './DesktopWorkspace.scss';

const DesktopWorkspace = (props) => {
  const {
    home,
    sections,
    windows,
    renameSection,
    windowsOpened,
    openWindow,
    onToggleHomeMenu,
  } = props;

  const drawIcons = () => {
    const s = sortArray(sections, 'id');

    return s.map((section) => {
      if (section.mode === 'user') {
        return (
          <DesktopIcon
            key={section.id}
            iconId={section.id}
            iconType={section.icon}
            iconTitle={section.title}
            iconKey={section.type}
            renameSection={renameSection}
            onDoubleClick={() => {
              const win = windows.filter(w => w.section === section.type)[0] ||
                { ...constants.windowObject, key: uuid(), section: section.type };
              openWindow(win);
            }}
          />
        );
      }

      return false;
    });
  };

  const clickHandler = () => {
    if (home) {
      onToggleHomeMenu(false);
    }
  };

  return (
    <div className="DesktopWorkspace" onClick={clickHandler}>
      {drawIcons()}
      {windowsOpened()}
    </div>
  );
};

DesktopWorkspace.propTypes = {
  home: PropTypes.bool,
  sections: PropTypes.array,
  windows: PropTypes.array,
  renameSection: PropTypes.func,
  windowsOpened: PropTypes.func,
  openWindow: PropTypes.func,
  onToggleHomeMenu: PropTypes.func,
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
)(DesktopWorkspace);
