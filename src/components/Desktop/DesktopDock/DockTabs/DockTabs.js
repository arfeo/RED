import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { constants } from '../../../../utils/constants';
import { uuid, objectPropInArray } from './../../../../utils/tools';

import './DockTabs.scss';

const DockTabs = (props) => {
  const {
    sections,
    windows,
    tabs,
    onOpenWindow,
  } = props;

  const generateActiveTabs = () => {
    let activeTab = null;

    windows.map((win) => {
      if (!win.minimized) {
        activeTab = win.section;
      }
      return true;
    });

    return tabs.map((tab) => {
      return (
        <div
          key={uuid()}
          className={`
            tab
            ${tab.section === activeTab ? 'active' : ''}
            ${windows.filter(w => w.section === tab.section)[0].minimized ? 'minimized' : ''}
          `}
          onClick={() => openWindow(tab)}
        >
          {sections[objectPropInArray(sections, 'type', tab.section)].title}
        </div>
      );
    });
  };

  const openWindow = (win) => {
    onOpenWindow({ ...win, minimized: false });
  };

  return (
    <div className="DockTabs">
      {generateActiveTabs()}
    </div>
  );
};

DockTabs.propTypes = {
  sections: PropTypes.array,
  windows: PropTypes.array,
  tabs: PropTypes.array,
  onOpenWindow: PropTypes.func,
};

export default connect(
  state => ({
    sections: state.sections,
    windows: state.windows,
    tabs: state.tabs,
  }),
  dispatch => ({
    onOpenWindow: (payload) => {
      dispatch({ type: constants.actions.OPEN_WINDOW, payload });
    },
  }),
)(DockTabs);
