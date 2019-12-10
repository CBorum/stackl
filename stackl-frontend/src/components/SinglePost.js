import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getSinglePost } from '../actions/PostActions'
import { formatDate } from './dateFormat'
import Answer from './Answer'
import Comment from './Comment'

class SinglePost extends React.Component {

    componentDidMount() {
        const { dispatch, match: { params } } = this.props;
        dispatch(getSinglePost(params.postId))
        window.scrollTo(0, 0)
    }

    render() {
        let post = this.props.post;
        if (!this.props.post) return <div className="col-9 mt-4"></div>;
        
        return (
            <div className="col-9 mt-4">
                <div className="row">
                    <div className="col-1 pr-0">
                        <div className="p-2 text-align-center">
                            <h4>{post.score}</h4>
                            <div>votes</div>
                        </div>
                    </div>
                    <div className="col-11">
                        <h2>{post.title}</h2>
                        <div style={{color: "gray"}}>asked {formatDate(post.creationDate)} by {post.author ? post.author.name : <i>Unknown</i>}</div>
                        <hr />
                        <div dangerouslySetInnerHTML={{__html: post.body}}></div>
                        {/* <span className="comments-header">Comments</span> */}
                        <div className="inline-block">
                            {
                                post.tags.map((t, i) => {
                                    return <span key={i} className={`badge badge-secondary ${i !== 0 ? "ml-2" : ""}`}>{t}</span>
                                })
                            }
                        </div>
                        <hr style={{marginBottom: 0}} />
                        <div className="comments list-group list-group-flush">
                            {post.comments.map((c, i) => {
                                return (<Comment key={i} comment={c} />)
                            })}
                        </div>
                    </div>
                </div>
                {
                    post.comments.length === 0 ? <div className="mt-4"></div> : null
                }
                <div className="col-12">
                    <h4>{post.answers.length} Answers</h4>
                    <hr />
                </div>
                <div className="answers list-group list-group-flush">
                    <Answer answer={post.acceptedAnswerPost} accepted={true}/>
                    {post.answers.map((a, i) => {
                        return (<Answer key={i} answer={a} />)
                    })}
                </div>
            </div>
        );
    }
}

SinglePost = withRouter(SinglePost);

const mapStateToProps = (state, ownProps) => ({ post: state.Posts.singlePost });

export default connect(mapStateToProps)(SinglePost);