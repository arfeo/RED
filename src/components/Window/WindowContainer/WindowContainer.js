import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ResizableBox } from 'react-resizable';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Settings from '../../../sections/Settings/Settings';
import Reference from '../../../sections/Reference/Reference';
import { constants } from '../../../utils/constants';

import './WindowContainer.scss';
import FormFeedback from '../../Form/FeedBack';

const WindowContainer = (props) => {
  const {
    windows,
    section,
    table,
    form,
    onResizeWindow,
    onReplaceTab,
  } = props;
  const currentWindow = windows.filter(w => w.section === section)[0];

  const generateContent = () => {
    switch (section) {
      case 'settings':
      {
        return <Settings />;
      }
      case 'reference':
      {
        return <Reference />;
      }
      default:
      {
        if (table) {
          return (<ReactTable
            data={table.list}
            columns={table.columns}
            defaultPageSize={5}
            filterable
          />);
        } else if (form) {
          return (<FormFeedback />);
        }
        return (
          <div>Section content</div>
        );
      }
    }
  };

  return (
    <ResizableBox
      width={currentWindow.width}
      height={currentWindow.height}
      minConstraints={[300, 200]}
      onResizeStop={(e, data) => {
        const win = { ...currentWindow, width: data.size.width, height: data.size.height };

        onResizeWindow(win);
        onReplaceTab(win);
      }}
    >
      <div className="WindowContainer">
        {generateContent()}
      </div>
    </ResizableBox>
  );
};

WindowContainer.propTypes = {
  windows: PropTypes.array,
  section: PropTypes.string,
  form: PropTypes.any,
  table: PropTypes.any,
  onResizeWindow: PropTypes.func,
  onReplaceTab: PropTypes.func,
};

export default connect(
  state => ({
    windows: state.windows,
  }),
  dispatch => ({
    onResizeWindow: (payload) => {
      dispatch({ type: constants.actions.RESIZE_WINDOW, payload });
    },
    onReplaceTab: (payload) => {
      dispatch({ type: constants.actions.REPLACE_TAB, payload });
    },
  }),
)(WindowContainer);
