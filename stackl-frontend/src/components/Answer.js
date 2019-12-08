import React from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'

const mapStateToProps = (state, ownProps) => ({})

class SinglePost extends React.Component {
    render() {
        let answer = this.props.answer;
        let accepted = this.props.accepted;
        let acceptedEl = accepted ? "<div>(noget der viser det er accepted)</div>" : null;

        if(!answer) return null
        return (
            <div className="list-group-item">
                <div className="row">
                    <div className="col-1">
                        <div className="p-2 text-align-center">
                            <h4>{answer.score}</h4>
                            <div>votes</div>
                            {acceptedEl}
                        </div>
                    </div>
                    <div className="col-11">
                        <div dangerouslySetInnerHTML={{__html: answer.body}}></div>
                            <div className="comments list-group">
                            {answer.comments.map((c) => {
                                return (<Comment comment={c} />)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SinglePost);