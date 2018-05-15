import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import Icon from './../../Icon/Icon';
import DialogModal from '../../DialogModal/DialogModal';

import { constants } from '../../../utils/constants';

import './DesktopIcon.scss';

class DesktopIcon extends Component {
  constructor(props) {
    super(props);

    this.renameInputRef = null;

    this.state = {
      isRename: false,
      renameLabel: '',
    };
  }

  toggleRename = (e) => {
    this.setState({
      isRename: !this.state.isRename,
      renameLabel: e.currentTarget.innerHTML,
    });
  };

  toggleRenameContext = () => {
    this.setState({
      isRename: !this.state.isRename,
      renameLabel: this.props.iconTitle,
    });
  };

  contextMenu = (e) => {
    e.preventDefault();

    this.props.setContextMenu({
      active: true,
      items: [
        {
          name: 'Open',
          click: this.props.onDoubleClick,
        },
        {
          name: 'Rename',
          click: this.toggleRenameContext,
        },
      ],
      x: e.pageX,
      y: e.pageY,
    });
  };

  renderRenameInput = () => {
    return (
      <input
        ref={(el) => {
          this.renameInputRef = el;
        }}
        type="text"
        defaultValue={this.state.renameLabel}
      />
    );
  };

  render() {
    const {
      iconId,
      iconType,
      iconTitle,
      iconKey,
      renameSection,
      onDoubleClick,
    } = this.props;

    return (
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[10, 10]}
        cancel=".title"
        disabled={this.state.isRename}
      >
        <div onContextMenu={(e) => { this.contextMenu(e); }} className="DesktopIcon">
          <Icon
            iconType={iconType}
            iconSize="middle"
            onDoubleClick={onDoubleClick}
          />
          <span
            className="title"
            icon-key={iconKey}
            onDoubleClick={(e) => {
              if (!this.state.isRename) {
                this.toggleRename(e);
              }
            }}
          >
            {iconTitle}
            <DialogModal
              isOpened={this.state.isRename}
              isBackdrop={!!true}
              className="modal-sm"
              confirmTitle="Переименовать..."
              confirmContent={this.renderRenameInput()}
              onToggle={this.toggleRename}
              onConfirm={() => {
                this.setState({ isRename: false });
                renameSection(iconId, iconKey, this.renameInputRef.value, iconType, 'user');
              }}
              continueText="Переименовать"
            />
          </span>
        </div>
      </Draggable>
    );
  }
}

DesktopIcon.propTypes = {
  iconId: PropTypes.number,
  iconType: PropTypes.string,
  iconTitle: PropTypes.string,
  iconKey: PropTypes.string,
  renameSection: PropTypes.func,
  onDoubleClick: PropTypes.func,
  setContextMenu: PropTypes.func,
};

export default connect(
  null,
  dispatch => ({
    setContextMenu: (payload) => {
      dispatch({ type: constants.actions.SET_CONTEXT, payload });
    },
  })
)(DesktopIcon);
