import React from 'react';
import PropTypes from 'prop-types';

import './Icon.scss';

const Icon = (props) => {
  const {
    iconType,
    iconSize,
    iconColor,
    iconTitle,
    onClick,
    onDoubleClick,
    iconSpecial,
  } = props;

  return (
    <button
      className={`Icon icon-${iconType} ${iconSize} ${iconColor} ${iconSpecial}`}
      title={iconTitle}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
    </button>
  );
};

Icon.propTypes = {
  iconType: PropTypes.string,
  iconSize: PropTypes.string,
  iconColor: PropTypes.string,
  iconTitle: PropTypes.string,
  iconSpecial: PropTypes.string,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
};

export default Icon;
