import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getSinglePost, getSinglePostDone } from '../actions/PostActions'
import { formatDate } from './dateFormat'
import Answer from './Answer'
import Comment from './Comment'
import MarkingDialog from './modals/MarkingDialog'
import { savePost } from '../actions/SavedPostsActions'

class SinglePost extends React.Component {
    state = {
        amount: 5,
        postId: -1,
        markingNote: "",
    }

    componentDidMount() {
        const { dispatch, match: { params } } = this.props;
        dispatch(getSinglePost(params.postId))
        window.scrollTo(0, 0)
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(getSinglePostDone(null)) // clearing store of post
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            const { dispatch, match: { params } } = this.props
            dispatch(getSinglePost(params.postId))
        }
    }

    savePost() {
        const { dispatch } = this.props
        dispatch(savePost({ postId: this.state.postId, note: this.state.markingNote }))
        this.setState({ postId: -1, markingNote: "" })
    }

    render() {
        let post = this.props.post;
        if (!this.props.post) return <div className="col-12 col-md-9 col-lg-9 mt-4"></div>;

        return (
            <div className="col-12 col-md-9 col-lg-9 mt-4">
                <div className="row">
                    <div className="col-2 col-md-1 pr-0">
                        <div className="p-2 text-align-center">
                            <h4>{post.score}</h4>
                            <div>votes</div>
                            {
                                this.props.token ?
                                    <button onClick={() => { this.setState({ postId: post.postId }, () => this.refs.markingPostDialog.show()) }} className="btn btn-sm btn-outline-primary mt-4">Mark</button>
                                    : null
                            }
                        </div>
                    </div>
                    <div className="col-10 col-md-11">
                        <h2 className="inline-block">{post.title}</h2>
                        <div style={{ color: "gray" }}>asked {formatDate(post.creationDate)} by {post.author ? post.author.name : <i>Unknown</i>}</div>
                        <hr />
                        <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
                        {/* <span className="comments-header">Comments</span> */}
                        <div className="inline-block">
                            {
                                post.tags.map((t, i) => {
                                    return <span key={i} className={`badge badge-secondary ${i !== 0 ? "ml-2" : ""}`}>{t}</span>
                                })
                            }
                        </div>
                        <hr style={{ marginBottom: 0 }} />
                        <div className="comments list-group list-group-flush">
                            {post.comments.filter((c, i) => i < this.state.amount).map((c, i) => {
                                return (<Comment key={i} comment={c} />)
                            })}
                        </div>
                        {
                            this.state.amount < post.comments.length ?
                                <div className="mt-2" style={{ width: "100%", textAlign: "center" }}>
                                    <button onClick={() => this.setState({ amount: post.comments.length })} className="btn  btn-sm">Show <b>{post.comments.length - this.state.amount}</b> more comments</button>
                                </div>
                                : this.state.amount > 5 ?
                                    <div className="mt-2" style={{ width: "100%", textAlign: "center" }}>
                                        <button onClick={() => this.setState({ amount: 5 })} className="btn  btn-sm">Show less comments</button>
                                    </div>
                                    : null
                        }
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
                    <Answer answer={post.acceptedAnswerPost} accepted={true} />
                    {post.answers.map((a, i) => {
                        return (<Answer key={i} answer={a} />)
                    })}
                </div>
                <MarkingDialog ref="markingPostDialog" closeHandler={() => { this.setState({ markingNote: "" }) }} saveHandler={() => this.savePost()} title="Create marking">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Note</span>
                        </div>
                        <textarea value={this.state.markingNote} onChange={e => this.setState({ markingNote: e.target.value })} className="form-control" aria-label="With textarea"></textarea>
                    </div>
                </MarkingDialog>
            </div>
        );
    }
}

SinglePost = withRouter(SinglePost);

const mapStateToProps = (state, ownProps) => ({ post: state.Posts.singlePost, token: state.Login.token });

export default connect(mapStateToProps)(SinglePost);