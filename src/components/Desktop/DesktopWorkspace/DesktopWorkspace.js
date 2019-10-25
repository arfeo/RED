import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GithubPicker } from 'react-color';

import DialogModal from './../../DialogModal/DialogModal';
import DesktopIcon from './../DesktopIcon/DesktopIcon';

import { ACTIONS, WINDOW_OBJECT } from './../../../utils/constants';
import { uuid, sortArray } from './../../../utils/tools';
import { getData, saveData } from './../../../utils/storage';

import './DesktopWorkspace.scss';

class DesktopWorkspace extends Component {
  constructor(props) {
    super(props);

    this.colorPicked = null;

    this.state = {
      isColorPicker: false,
      bgColor: getData('bgColor') || '#fff',
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
            renameSection={renameSection}
            onDoubleClick={() => {
              const win = windows.filter(w => w.section === section.type)[0] || {
                ...WINDOW_OBJECT,
                key: uuid(),
                section: section.type,
              };
              openWindow(win);
            }}
          />
        );
      }

      return false;
    });
  }

  clickHandler = () => {
    if (this.props.home) {
      this.props.onToggleHomeMenu(false);
    }
  }

  showColorPicker = () => {
    this.setState({ isColorPicker: true });
  }

  hideColorPicker = () => {
    this.setState({ isColorPicker: false });
  }

  saveBgColor = () => {
    saveData('bgColor', this.colorPicked);

    this.setState({ bgColor: this.colorPicked });

    this.hideColorPicker();
  }

  contextMenu = (e) => {
    if (e.target.classList.contains('DesktopWorkspace')) {
      e.preventDefault();

      this.clickHandler();

      this.props.setContextMenu({
        active: true,
        items: [
          {
            name: 'Change background color',
            click: this.showColorPicker,
          },
        ],
        x: e.pageX,
        y: e.pageY,
      });
    }
  }

  render() {
    return (
      <div
        style={{ backgroundColor: this.state.bgColor }}
        className="DesktopWorkspace"
        onClick={this.clickHandler}
        onContextMenu={e => this.contextMenu(e)}
      >
        {this.drawIcons()}
        {this.props.windowsOpened()}
        <DialogModal
          isOpened={this.state.isColorPicker}
          isBackdrop={!!true}
          className="modal-sm"
          confirmTitle="Change background color"
          confirmContent={
            <GithubPicker
              width="100%"
              onChangeComplete={(color) => { this.colorPicked = color.hex; }}
            />
          }
          onToggle={this.hideColorPicker}
          onConfirm={this.saveBgColor}
          continueText="Apply"
        />
      </div>
    );
  }
}

DesktopWorkspace.propTypes = {
  home: PropTypes.bool,
  sections: PropTypes.array,
  windows: PropTypes.array,
  renameSection: PropTypes.func,
  windowsOpened: PropTypes.func,
  openWindow: PropTypes.func,
  onToggleHomeMenu: PropTypes.func,
  setContextMenu: PropTypes.func,
};

export default connect(
  state => ({
    home: state.home,
    sections: state.sections,
    windows: state.windows,
  }),
  dispatch => ({
    onToggleHomeMenu: (payload) => {
      dispatch({ type: ACTIONS.TOGGLE_HOME_MENU, payload });
    },
    setContextMenu: (payload) => {
      dispatch({ type: ACTIONS.SET_CONTEXT, payload });
    },
  }),
)(DesktopWorkspace);
