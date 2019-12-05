import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({})

class Comment extends React.Component {
    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: this.props.comment.text}}></div>
                <div className="author">{this.props.comment.author.name}</div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Comment);