import React from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import { formatDate } from './dateFormat';



const mapStateToProps = (state, ownProps) => ({})

class SinglePost extends React.Component {
    render() {
        let answer = this.props.answer;
        let accepted = this.props.accepted;
        console.log(answer)

        if (!answer) return null
        return (
            <div className="list-group-item">
                <div className="row">
                    <div className="col-1">
                        <div className="p-2 text-align-center">
                            <h4>{answer.score}</h4>
                            <div>votes</div>
                            {
                                accepted ?
                                    <div style={{fontSize: 14}} className="alert alert-success mt-2">
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
                        <div className="comments list-group">
                            {answer.comments.map((c, i) => {
                                return (<Comment key={i} comment={c} />)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SinglePost);