import React from "react";
import {hideCurrentModal} from '../../actions/ModalActions';

import { connect } from 'react-redux';

const mapStateToProps = state => ({currentModalId: state.Modal.currentModalId});

function ModalWrapper(props) {
    return (
        <div className={`modal-container pt-5 px-3 ${props.currentModalId === props.modalId ? 'display' : ''}`}>
            <div onClick={props.dispatch.bind(null, hideCurrentModal())} className="modal-close-btn">close</div>
            {props.children}
        </div>
    );
}

export default connect(mapStateToProps)(ModalWrapper);