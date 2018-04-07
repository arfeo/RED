import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './DialogModal.scss';

class DialogModal extends React.Component {
  state = {
    modal: this.props.isOpened,
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      modal: newProps.isOpened > this.props.isOpened,
    });
  }

  render() {
    const {
      isBackdrop,
      className,
      confirmTitle,
      confirmContent,
      onToggle,
      onConfirm,
      continueText,
      cancelText,
    } = this.props;

    return (
      <Modal
        isOpen={this.state.modal}
        toggle={onToggle}
        className={className}
        backdrop={isBackdrop}
      >
        <ModalHeader toggle={onToggle}>
          {confirmTitle}
        </ModalHeader>
        <ModalBody className="confirm-modal-content">
          {confirmContent}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirm}>{continueText || 'Продолжить'}</Button>{' '}
          <Button color="secondary" onClick={onToggle}>{cancelText || 'Отменить'}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

DialogModal.propTypes = {
  isOpened: PropTypes.bool,
  isBackdrop: PropTypes.bool,
  className: PropTypes.string,
  confirmTitle: PropTypes.string,
  confirmContent: PropTypes.any,
  onToggle: PropTypes.func,
  onConfirm: PropTypes.func,
  continueText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default DialogModal;
