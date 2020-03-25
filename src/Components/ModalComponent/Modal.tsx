import React, {Component, HtmlHTMLAttributes}  from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';


class Modal extends Component {
    root!:HTMLDivElement;
    
    componentWillMount() {
        this.root = document.createElement('div');
        document.body.appendChild(this.root);
    }

    componentWillUnmount() {
        document.body.removeChild(this.root);
    }

    render() {
        return ReactDOM.createPortal(
            <div className = {styles.modal}>
                {this.props.children}
            </div>,
            this.root
        )
    }
}

export default Modal; 