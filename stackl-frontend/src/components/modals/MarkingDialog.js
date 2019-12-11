import React from 'react'
import BaseDialog from './BaseDialog'

class MarkingDialog extends BaseDialog {
	getButtons() {
		return (
			<div>
				<button onClick={this.props.closeHandler} type="button" className="btn btn-default btn-outline-info mr-2" data-dismiss="modal">Close</button>
				<button onClick={this.props.saveHandler} type="button" className="btn btn-primary" data-dismiss="modal" disabled={this.props.disableSave}>{ this.props.saveText ? this.props.saveText : 'Save' }</button>
			</div>
		)
	}
}

export default MarkingDialog