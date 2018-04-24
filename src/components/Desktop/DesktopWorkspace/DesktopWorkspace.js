import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GithubPicker } from 'react-color';
import DialogModal from '../../DialogModal/DialogModal';

import DesktopIcon from './../DesktopIcon/DesktopIcon';
import { constants } from '../../../utils/constants';
import { uuid, sortArray } from './../../../utils/tools';
import setBackground from '../../../sagas/theme';
import './DesktopWorkspace.scss';

class DesktopWorkspace extends React.Component {
  constructor(props) {
    super(props);
    const {
      home,
      sections,
      windows,
      renameSection,
      windowsOpened,
      openWindow,
      onToggleHomeMenu,
      setContextMenu,
      active,
    } = props;

    this.color = props.theme.bg;
    this.state = {
      isChange: false,
    };
  }

  drawIcons = () => {
    const {
      sections,
      openWindow,
      renameSection,
      windows,
    } = this.props;
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
            form={section.form || false}
            table={section.table || false}
            renameSection={renameSection}
            onDoubleClick={() => {
              const win = windows.filter(w => w.section === section.type)[0] ||
                {
                  ...constants.windowObject, key: uuid(), section: section.type, table: section.table || false, form: section.form || false,
                };
              openWindow(win);
            }}
          />
        );
      }

      return false;
    });
  };

  clickHandler = () => {
    if (this.home) {
      this.onToggleHomeMenu(false);
    }
  };

  changeBackground = () => {
    this.setState({ isChange: true });
  };

  contextMenu = (e) => {
    e.preventDefault();
    this.props.setContextMenu({
      active: true,
      items: [
        {
          name: 'Set background',
          click: this.changeBackground,
        },
      ],
      x: e.pageX,
      y: e.pageY,
    });
  };
  render() {
    return (
      <div
        style={{ backgroundColor: this.props.theme.bg }}
        className="DesktopWorkspace"
        onClick={(e) => { this.clickHandler(); }}
        onContextMenu={(e) => {
          this.contextMenu(e);
        }}
      >
        {this.drawIcons()}
        {this.props.windowsOpened()}
        <DialogModal
          isOpened={this.state.isChange}
          isBackdrop={!!true}
          className="modal-sm"
          confirmTitle="Изменить цвет фона"
          confirmContent={
            <GithubPicker
              width="100%"
              onChangeComplete={(color) => { this.color = color.hex; }}
            />
          }
          onToggle={() => {
            this.setState({ isChange: false });
          }}
          onConfirm={() => {
            if (true) { this.props.setBg(this.color); }
            this.setState({ isChange: false });
          }}
          continueText="Сохранить"
        />
      </div>
    );
  }
}

DesktopWorkspace.propTypes = {
  home: PropTypes.bool,
  sections: PropTypes.array,
  windows: PropTypes.array,
  theme: PropTypes.any,
  active: PropTypes.bool,
  renameSection: PropTypes.func,
  windowsOpened: PropTypes.func,
  openWindow: PropTypes.func,
  onToggleHomeMenu: PropTypes.func,
  setContextMenu: PropTypes.func,
  setBg: PropTypes.func,
};

export default connect(
  state => ({
    home: state.home,
    sections: state.sections,
    windows: state.windows,
    theme: state.theme,
  }),
  dispatch => ({
    onToggleHomeMenu: (payload) => {
      dispatch({ type: constants.actions.TOGGLE_HOME_MENU, payload });
    },
    setContextMenu: (payload) => {
      dispatch({ type: constants.actions.SET_CONTEXT, payload });
    },
    setBg: (payload) => {
      dispatch({ type: constants.actions.SET_THEME, payload });
    },
  }),
)(DesktopWorkspace);
