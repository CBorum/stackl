import React from 'react'
import { connect } from 'react-redux'

import { formatDate } from './dateFormat'

const mapStateToProps = (state, ownProps) => ({})

class Comment extends React.Component {
    render() {
        let comment = this.props.comment
        return (
            <div className="list-group-item">
                <div className="row">
                    <div className="px-2 my-auto text-align-center comment-votes">
                        {comment.score}
                    </div>
                    <div className="col-11">
                        <div>
                            <span className="comment-text" dangerouslySetInnerHTML={{__html: comment.text}}></span>
                            <span className="author"> - {comment.author.name} on {formatDate(comment.createdDate)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Comment);