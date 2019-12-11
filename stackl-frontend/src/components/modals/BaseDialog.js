import React from 'react'
import $ from 'jquery'


class BaseDialog extends React.Component {
    show() {
        $(this.refs.dialog).on('shown.bs.modal', () => {
            if (this.props.focus) {
                this.props.focus.focus()
            }
        })
        $(this.refs.dialog).modal('show')
    }

    hide() {
        $(this.refs.dialog).modal('hide')
    }

    getButtons() {
        return (
            <div>
                <button type="button" className="btn btn-default" data-dismiss="modal">OK</button>
            </div>
        )
    }

    getContent() {
        return <span />
    }

    render() {
        return (
            <div ref="dialog" className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header sticky-modal-header">
                            <h4 className="modal-title">{this.props.title}</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" onClick={this.props.closeHandler}>&times;</span></button>
                        </div>
                        <div className="modal-body">
                            {this.getContent()}
                            {this.props.children}
                        </div>
                        <div className="modal-footer sticky-modal-footer">
                            {this.getButtons()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BaseDialog