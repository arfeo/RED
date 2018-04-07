import React from 'react';
import PropTypes from 'prop-types';

import WindowButtons from './../WindowButtons/WindowButtons';

import './WindowHeader.scss';

const WindowHeader = (props) => {
  const {
    title,
    onMinimize,
    onMaximize,
    onClose,
  } = props;

  return (
    <div className="WindowHeader">
      {title}
      <WindowButtons
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
      />
    </div>
  );
};

WindowHeader.propTypes = {
  title: PropTypes.string,
  onMinimize: PropTypes.func,
  onMaximize: PropTypes.func,
  onClose: PropTypes.func,
};

export default WindowHeader;
