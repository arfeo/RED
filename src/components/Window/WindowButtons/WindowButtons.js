import React from 'react';
import PropTypes from 'prop-types';

import Icon from './../../Icon/Icon';

import './WindowButtons.scss';

const WindowButtons = (props) => {
  const {
    onMinimize,
    onMaximize,
    onClose,
  } = props;

  return (
    <div className="WindowButtons">
      <Icon iconType="minus" iconSpecial="window-buttons" iconTitle="Свернуть" onClick={onMinimize} />
      <Icon iconType="enlarge" iconSpecial="window-buttons" iconTitle="Развернуть на весь экран" onClick={onMaximize} />
      <Icon iconType="cross" iconSpecial="window-buttons" iconTitle="Закрыть" onClick={onClose} />
    </div>
  );
};

WindowButtons.propTypes = {
  onMinimize: PropTypes.func,
  onMaximize: PropTypes.func,
  onClose: PropTypes.func,
};

export default WindowButtons;
