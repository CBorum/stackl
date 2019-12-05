import React from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'

const mapStateToProps = (state, ownProps) => ({})

class SinglePost extends React.Component {
    render() {
        if(!this.props.answer) return null
        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: this.props.answer.body}}></div>
                    <div className="comments">
                    <h3>Comments</h3>
                    {this.props.answer.comments.map((c) => {
                        return (<Comment comment={c} />)
                    })}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SinglePost);