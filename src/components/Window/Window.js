import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import WindowHeader from './WindowHeader/WindowHeader';
import WindowContainer from './WindowContainer/WindowContainer';
import { constants } from '../../utils/constants';

import './Window.scss';

const Window = (props) => {
  const {
    title,
    section,
    windows,
    onClick,
    onMinimize,
    onMaximize,
    onClose,
    onDragWindow,
  } = props;

  const currentWindow = windows.filter(w => w.section === section)[0];

  const drawWindowInnerContent = () => {
    return (
      <div
        className={`
          Window
          ${currentWindow.minimized ? 'minimized' : ''}
          ${currentWindow.maximized ? 'maximized' : ''}
        `}
        onClick={(e) => {
          if (!e.target.classList.contains('window-buttons')) {
            onClick();
          }
        }}
      >
        <WindowHeader
          title={title}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
        />
        <WindowContainer
          section={section}
        />
      </div>
    );
  };

  return (
    <Draggable
      defaultPosition={{
        x: currentWindow.x,
        y: currentWindow.y,
      }}
      position={null}
      handle=".WindowHeader"
      disabled={currentWindow.maximized}
      onStop={(e, data) => {
        onDragWindow({ ...currentWindow, x: data.x, y: data.y });
      }}
    >
      {drawWindowInnerContent()}
    </Draggable>
  );
};

Window.propTypes = {
  windows: PropTypes.array,
  title: PropTypes.string,
  section: PropTypes.string,
  onClick: PropTypes.func,
  onMinimize: PropTypes.func,
  onMaximize: PropTypes.func,
  onClose: PropTypes.func,
  onDragWindow: PropTypes.func,
};

export default connect(
  state => ({
    windows: state.windows,
  }),
  dispatch => ({
    onDragWindow: (payload) => {
      dispatch({ type: constants.actions.DRAG_WINDOW, payload });
    },
  }),
)(Window);
