import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ContextMenuItem from './ContextMenuItem';

import { ACTIONS } from './../../utils/constants';

import './ContextMenu.scss';

const ContextMenu = (props) => {
  const {
    active,
    items,
    x,
    y,
    hideContext,
  } = props;

  window.onmousedown = (e) => {
    if (active) {
      if (e.target.parentNode.getAttribute('id') !== 'context') {
        hideContext();
      }
    }
  };

  const renderMenu = () => {
    if (active) {
      return (
        <div id="context" className="context-menu" style={{ left: `${x + 20}px`, top: `${y + 20}px` }}>
          {items.map((item, key) => {
            const k = key;
            return (
              <ContextMenuItem
                name={item.name}
                handleClick={item.click}
                hideContext={hideContext}
                key={k}
              />
            );
          })}
        </div>
      );
    }
    return null;
  };

  return renderMenu();
};

ContextMenu.propTypes = {
  items: PropTypes.array,
  active: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
  hideContext: PropTypes.func,
};

export default connect(
  state => ({
    items: state.context.items,
    active: state.context.active,
    x: state.context.x,
    y: state.context.y,
  }),
  dispatch => ({
    hideContext: () => {
      dispatch({ type: ACTIONS.CLEAR_CONTEXT });
    },
    setContextMenu: (payload) => {
      dispatch({ type: ACTIONS.SET_CONTEXT, payload });
    },
  })
)(ContextMenu);
