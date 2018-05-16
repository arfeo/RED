import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GithubPicker } from 'react-color';

import DialogModal from './../../DialogModal/DialogModal';
import DesktopIcon from './../DesktopIcon/DesktopIcon';

import { constants } from './../../../utils/constants';
import { uuid, sortArray } from './../../../utils/tools';

import './DesktopWorkspace.scss';

class DesktopWorkspace extends Component {
  constructor(props) {
    super(props);

    this.colorPicked = '#fff';

    this.state = {
      isChange: false,
      bgColor: '#fff',
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
                ...constants.windowObject,
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

  changeBackground = () => {
    this.setState({ isChange: true });
  }

  contextMenu = (e) => {
    e.preventDefault();

    this.clickHandler();

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
          isOpened={this.state.isChange}
          isBackdrop={!!true}
          className="modal-sm"
          confirmTitle="Изменить цвет фона"
          confirmContent={
            <GithubPicker
              width="100%"
              onChangeComplete={(color) => { this.colorPicked = color.hex; }}
            />
          }
          onToggle={() => {
            this.setState({
              isChange: false,
            });
          }}
          onConfirm={() => {
            this.setState({
              isChange: false,
              bgColor: this.colorPicked,
            });
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
      dispatch({ type: constants.actions.TOGGLE_HOME_MENU, payload });
    },
    setContextMenu: (payload) => {
      dispatch({ type: constants.actions.SET_CONTEXT, payload });
    },
  }),
)(DesktopWorkspace);
