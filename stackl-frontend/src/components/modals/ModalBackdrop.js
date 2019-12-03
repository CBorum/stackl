import React from "react";
import {hideCurrent} from '../../js/modals';

function ModalBackdrop() {
    return (
        <div className="modal-backdrop" onClick={hideCurrent}>

        </div>
    );
}

export default ModalBackdrop;
