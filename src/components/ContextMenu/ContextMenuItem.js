import React from 'react';
import PropTypes from 'prop-types';

const ContextMenuItem = (props) => {
  const handleClick = (e) => {
    e.preventDefault();

    props.hideContext();
    props.handleClick();
  };

  return (
    <button className="context-menu-item" onClick={e => handleClick(e)}>
      {props.name}
    </button>
  );
};

ContextMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  hideContext: PropTypes.func.isRequired,
};

export default ContextMenuItem;
