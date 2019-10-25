import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Window from './../Window/Window';
import DesktopWorkspace from './DesktopWorkspace/DesktopWorkspace';
import DesktopDock from './DesktopDock/DesktopDock';
import ContextMenu from './../ContextMenu/ContextMenu';

import { ACTIONS } from '../../utils/constants';
import { objectPropInArray } from '../../utils/tools';

import './Desktop.scss';

const Desktop = (props) => {
  const {
    sections,
    windows,
    tabs,
    onRenameSection,
    onOpenWindow,
    onMinimizeWindow,
    onMaximizeWindow,
    onCloseWindow,
    onAddTab,
    onRemoveTab,
    onReplaceTab,
  } = props;

  const renameSection = (id, type, title, icon, mode) => {
    if (title) {
      onRenameSection({
        id,
        type,
        title,
        icon,
        mode,
      });
    }
  };

  const windowsOpened = () => {
    return windows.map((win) => {
      return (
        <Window
          key={win.key}
          section={win.section}
          title={sections[objectPropInArray(sections, 'type', win.section)].title}
          onClick={() => openWindow(win)}
          onMinimize={() => minimizeWindow(win)}
          onMaximize={() => maximizeWindow(win)}
          onClose={() => closeWindow(win)}
        />
      );
    });
  };

  const openWindow = (win) => {
    if (objectPropInArray(tabs, 'section', win.section) === false) {
      onAddTab(win);
    }

    onOpenWindow({ ...win, minimized: false });
  };

  const minimizeWindow = (win) => {
    onMinimizeWindow({ ...win, minimized: true });
  };

  const maximizeWindow = (win) => {
    const w = { ...win, maximized: !win.maximized };

    onMaximizeWindow(w);
    onReplaceTab(w);
  };

  const closeWindow = (win) => {
    onRemoveTab(win);
    onCloseWindow(win);
  };

  return (
    <div className="Desktop">
      <DesktopWorkspace
        renameSection={renameSection}
        windowsOpened={windowsOpened}
        openWindow={openWindow}
      />
      <DesktopDock openWindow={openWindow} />
      <ContextMenu />
    </div>
  );
};

Desktop.propTypes = {
  sections: PropTypes.array,
  windows: PropTypes.array,
  tabs: PropTypes.array,
  onRenameSection: PropTypes.func,
  onOpenWindow: PropTypes.func,
  onMinimizeWindow: PropTypes.func,
  onMaximizeWindow: PropTypes.func,
  onCloseWindow: PropTypes.func,
  onAddTab: PropTypes.func,
  onRemoveTab: PropTypes.func,
  onReplaceTab: PropTypes.func,
};

export default connect(
  state => ({
    sections: state.sections,
    windows: state.windows,
    tabs: state.tabs,
  }),
  dispatch => ({
    onRenameSection: (payload) => {
      dispatch({ type: ACTIONS.RENAME_SECTION, payload });
    },
    onOpenWindow: (payload) => {
      dispatch({ type: ACTIONS.OPEN_WINDOW, payload });
    },
    onMinimizeWindow: (payload) => {
      dispatch({ type: ACTIONS.MINIMIZE_WINDOW, payload });
    },
    onMaximizeWindow: (payload) => {
      dispatch({ type: ACTIONS.MAXIMIZE_WINDOW, payload });
    },
    onCloseWindow: (payload) => {
      dispatch({ type: ACTIONS.CLOSE_WINDOW, payload });
    },
    onAddTab: (payload) => {
      dispatch({ type: ACTIONS.ADD_TAB, payload });
    },
    onRemoveTab: (payload) => {
      dispatch({ type: ACTIONS.REMOVE_TAB, payload });
    },
    onReplaceTab: (payload) => {
      dispatch({ type: ACTIONS.REPLACE_TAB, payload });
    },
  }),
)(Desktop);
