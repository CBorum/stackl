import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import '../scss/index.scss';
import { formatDate } from './dateFormat';
import { getPosts } from '../actions/PostActions';
import store from '../store';
import { savePost } from '../actions/SavedPostsActions';
import MarkingDialog from './modals/MarkingDialog';

const dispatchSavePost = (postId, note) => store.dispatch(savePost({ postId, note }));

window.dispatchSavePost = dispatchSavePost;

const mapStateToProps = (state, ownProps) => ({ posts: state.Posts.posts, token: state.Login.token, userId: state.Login.userId });

class PostList extends React.Component {
    state = {
        openedIndices: {},
        offset: 0,
        limit: 10,
        markingNote: "",
        postId: -1,
    };

    componentDidMount() {
        const { dispatch } = this.props
        const query = queryString.parse(this.props.location.search)
        dispatch(getPosts({ input: query.input, offset: this.state.offset, limit: this.state.limit }, this.props.userId))
    }

    componentWillUnmount() { }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.search !== this.props.location.search) {
            const { dispatch } = this.props
            const query = queryString.parse(this.props.location.search)
            dispatch(getPosts({ input: query.input, offset: 0, limit: 10 }, this.props.userId))
        }
    }

    loadMore() {
        this.setState({ offset: this.state.offset + 10 }, () => {
            const { dispatch } = this.props
            const query = queryString.parse(this.props.location.search)
            dispatch(getPosts({ input: query.input, offset: this.state.offset, limit: this.state.limit }, this.props.userId))
        })
    }

    expandPost(i) {
        const obj = this.state.openedIndices
        if (obj[i]) delete obj[i];
        else obj[i] = true;
        this.setState({ openedIndices: obj })
    }

    savePost() {
        const { dispatch } = this.props
        dispatch(savePost({ postId: this.state.postId, note: this.state.markingNote }))
        this.setState({ postId: -1, markingNote: "" })
    }

    render() {
        if (!this.props.posts || (this.props.posts && this.props.posts.length === 0)) return <div className="col-9 mt-2"><i>No posts were found.</i></div>
        return (
            <div className="col-12 col-md-9 col-lg-9">
                <ul className="list-group list-group-flush">
                    {
                        this.props.posts.map((p, i) => {
                            // return <PostContainer key={i} expandPost={() => this.expandPost(i)} expanded={this.state.openedIndices[i]} body={p.body} />
                            if (p.parent) { // dont render li-element if no parent post exists
                                return (
                                    <li className={`list-group-item ${this.state.openedIndices[i] ? 'bg-light' : ""}`} key={i}>
                                        <PostContainer
                                            openMarkingDialog={() => { this.setState({ postId: p.parent.postId }, () => this.refs.markingDialog.show()) }}
                                            expandPost={() => this.expandPost(i)}
                                            expanded={this.state.openedIndices[i]}
                                            post={p}
                                            token={this.props.token}
                                        />
                                    </li>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                </ul>
                <div className="mt-4 mb-4 text-align-center">
                    <button onClick={() => this.loadMore()} className="btn btn-primary btn-sm inline-block">Load more posts</button>
                    <div className="float-right mr-2"><i>Showing {this.props.posts.filter(p => p.parent).length} results</i></div>
                </div>
                <MarkingDialog ref="markingDialog" closeHandler={() => { this.setState({ markingNote: "" }) }} saveHandler={() => this.savePost()} title="Create marking">
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

class PostContainer extends React.Component {
    state = {}

    render() {
        const { post, expanded } = this.props
        const item = post && post.parent !== null ? post.parent : post // if the post itself is the parent otherwise use parent
        if (!item) return null

        return (
            <div className="row">
                <div className="col-2 col-md-1 skrid-padding">
                    <div>
                        <div className="p-2 text-align-center">
                            <h4>{item.score}</h4>
                            <div>votes</div>
                        </div>
                        <div className="p-2 text-align-center">
                            <h4>{item.answersCount}</h4>
                            <div>answers</div>
                        </div>
                        <div className="text-align-center">
                            {
                                this.props.token ?
                                    <button onClick={() => this.props.openMarkingDialog()} className="btn btn-sm btn-outline-primary mt-1">Mark</button>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                <div className="col-10 col-md-11">
                    <div className="p-2">
                        <h4 className="display-6 inline-block"><a href={`#/post/${item.postId}`}>{item.title}</a></h4>
                        <div className="mt-4"></div>
                        <div onClick={this.props.expandPost} style={{ cursor: "pointer" }} className={`${expanded ? "" : "post-list-height"}`} dangerouslySetInnerHTML={{ __html: item.body }}></div>
                        <div className="row">
                            <div className="col-12 col-md-9 pt-4">
                                {
                                    item.tags.map((t, i) => {
                                        return <span key={i} className={`badge badge-secondary ${i !== 0 ? "ml-2" : ""}`}>{t}</span>
                                    })
                                }
                            </div>
                            <div className="col-12 col-md-3 pt-4">
                                <div className="float-right" style={{ color: "gray" }}>asked {formatDate(item.creationDate)} by {item.author ? item.author.name : <i>Unknown</i>}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PostList = withRouter(PostList)

export default connect(mapStateToProps)(PostList);