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
        console.log(this.props)
    }

    render() {
        let post = this.props.post;
        if (!this.props.post) return null;
        
        return (
            <div className="row">
                <div className="col-1">
                    <div className="p-2 text-align-center">
                        <h4>{post.score}</h4>
                        <div>votes</div>
                    </div>
                </div>
                <div className="col-11">
                    <h1>{post.title}</h1>
                    <div>asked {formatDate(post.creationDate)} by {post.author ? post.author.name : <i>Unknown</i>}</div>
                    <div dangerouslySetInnerHTML={{__html: post.body}}></div>
                    <span className="comments-header">Comments</span>
                    <div className="comments list-group list-group-flush">
                        {post.comments.map((c, i) => {
                            return (<Comment key={i} comment={c} />)
                        })}
                    </div>
                </div>
                <div className="col-12">
                    <h2>Answers</h2>
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