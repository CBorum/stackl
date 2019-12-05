import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getSinglePost } from '../actions/PostActions';
import Answer from './Answer'
import Comment from './Comment'

class SinglePost extends React.Component {

    componentDidMount() {
        const { dispatch, match: { params } } = this.props;
        dispatch(getSinglePost(params.postId))
        console.log(this.props)
    }

    render() {
        if (!this.props.post) return null;
        
        return (
            <div className="App">
                <div>
                    <h1>{this.props.post.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
                    <div className="comments">
                        <h3>Comments</h3>
                        {this.props.post.comments.map((c) => {
                            return (<Comment comment={c} />)
                        })}
                    </div>

                    <Answer answer={this.props.post.acceptedAnswerPost} />
                    <div className="answers">
                        <h2>Answers</h2>
                        {this.props.post.answers.map((a) => {
                            return (<Answer answer={a} />)
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

SinglePost = withRouter(SinglePost);

const mapStateToProps = (state, ownProps) => ({ post: state.Posts.singlePost });

export default connect(mapStateToProps)(SinglePost);