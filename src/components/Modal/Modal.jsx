import React from 'react';
import { Component } from 'react';

import style from './Modal.module.css';

export class Modal extends Component {
  render() {
    return (
      <div className={style.overlay}>
        <div className={style.modal}>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
