import React from 'react';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';

const modalRoot = document.getElementById('#modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  // handleBackdropClick = event => {
  //   if (event.currentTarget === event.target) {
  //     this.props.onModalClose();
  //   }
  // };

  // onClick={() => handleBackdropClick()}

  render() {
    const { largeImage } = this.props;
    return createPortal(
      <div className={style.overlay}>
        <div className={style.modal}>
          <img src={largeImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
