import { Fragment } from 'react';
import Class from './Modal.module.css';
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    return <div className={Class.backdrop} onClick={props.onClose}></div>
}

const ModalOverlay = (props) => {
    return <div className={Class.modal}>
        <div className={Class.content}>
            {props.children}
        </div>
    </div>
}

const portalElem = document.querySelector('#overlays');

const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onCloseCart} />, portalElem)}
        {ReactDOM.createPortal(
            <ModalOverlay>
                {props.children}
            </ModalOverlay>, 
            portalElem
        )}
    </Fragment>
};
 
export default Modal;