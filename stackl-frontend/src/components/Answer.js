import React from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import { formatDate } from './dateFormat';



const mapStateToProps = (state, ownProps) => ({})

class SinglePost extends React.Component {
    state = {
        amount: 5,
    }

    render() {
        let answer = this.props.answer;
        let accepted = this.props.accepted;

        if (!answer) return null
        return (
            <div className="list-group-item">
                <div className="row">
                    <div className="col-1">
                        <div className="text-align-center">
                            <h4>{answer.score}</h4>
                            <div>votes</div>
                            {
                                accepted ?
                                    <div className="accepted-answer alert alert-success p-1 mt-2">
                                        Accepted answer
                                    {/* <span className="glyphicon glyphicon-ok"></span> Den er bra og accepted! */}
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                    <div className="col-11">
                        <div dangerouslySetInnerHTML={{ __html: answer.body }}></div>
                        <span className="post-author">Answered by {answer.author.name} on {formatDate(answer.creationDate)}</span>
                        {
                            answer.comments.length > 0 ? <hr style={{marginBottom: 0}} /> : null
                        }
                        <div className="comments list-group comment-width">
                            {answer.comments.filter((c, i) => i < this.state.amount).map((c, i) => {
                                return (<Comment key={i} comment={c} />)
                            })}
                        </div>
                        {
                            this.state.amount < answer.comments.length ?
                                <div className="mt-2" style={{ width: "100%", textAlign: "center" }}>
                                    <button onClick={() => this.setState({ amount: answer.comments.length })} className="btn  btn-sm">Show <b>{answer.comments.length - this.state.amount}</b> more comments</button>
                                </div>
                                : this.state.amount > 5 ? 
                                <div className="mt-2" style={{ width: "100%", textAlign: "center" }}>
                                    <button onClick={() => this.setState({ amount: 5 })} className="btn  btn-sm">Show less comments</button>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SinglePost);