import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import '../scss/index.scss';
import { formatDate } from './dateFormat';
import { getPosts } from '../actions/PostActions';

const mapStateToProps = (state, ownProps) => ({ posts: state.Posts.posts });

class PostList extends React.Component {
    state = {
        openedIndices: {},
    }

    componentDidMount() { 
        const { dispatch } = this.props
        const values = queryString.parse(this.props.location.search)
        dispatch(getPosts(values.input))
     }

    componentWillUnmount() { }

    expandPost(i) {
        const obj = this.state.openedIndices
        if (obj[i]) delete obj[i];
        else obj[i] = true;
        this.setState({ openedIndices: obj })
    }


    render() {
        if (!this.props.posts || (this.props.posts && this.props.posts.length === 0)) return <div className="col-9 mt-2"><i>No posts were found.</i></div>
        return (
            <div className="col-9">
                <ul className="list-group list-group-flush">
                    {
                        this.props.posts.map((p, i) => {
                            // return <PostContainer key={i} expandPost={() => this.expandPost(i)} expanded={this.state.openedIndices[i]} body={p.body} />
                            if (p.parent) { // dont render li-element if no parent post exists
                                return <li className={`list-group-item ${this.state.openedIndices[i] ? 'bg-light' : ""}`} key={i}><PostContainer expandPost={() => this.expandPost(i)} expanded={this.state.openedIndices[i]} post={p} /></li>
                            } else {
                                return null
                            }
                        })
                    }
                </ul>
                <div className="mt-4 mb-4 text-align-center">
                    <button className="btn btn-primary btn-sm inline-block">Load more posts</button>
                    <div className="float-right mr-2"><i>Showing {this.props.posts.length} results</i></div>
                </div>
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
                <div className="col-1">
                    <div>
                        <div className="p-2 text-align-center">
                            <h4>{item.score}</h4>
                            <div>votes</div>
                        </div>
                        <div className="p-2 text-align-center">
                            <h4>{item.answersCount}</h4>
                            <div>answers</div>
                        </div>
                    </div>
                </div>
                <div className="col-11">
                    <div className="p-2">
                        <h4 className="display-6"><a href={`#/post/${item.postId}`}>{item.title}</a></h4>
                        <div className="mt-4"></div>
                        <div onClick={this.props.expandPost} style={{ cursor: "pointer" }} className={`${expanded ? "" : "post-list-height"}`} dangerouslySetInnerHTML={{ __html: item.body }}></div>
                        <div className="mt-4"></div>
                        <div className="inline-block">
                            {
                                item.tags.map((t, i) => {
                                    return <span key={i} className={`badge badge-secondary ${i !== 0 ? "ml-2" : ""}`}>{t}</span>
                                })
                            }
                        </div>
                        <div className="float-right" style={{ color: "gray" }}>asked {formatDate(item.creationDate)} by {item.author ? item.author.name : <i>Unknown</i>}</div>

                        {/* <button type="button" className="btn btn-primary btn-sm mt-3" onClick={this.props.expandPost} >Show {expanded ? "less" : "more"}</button> */}
                    </div>
                </div>
            </div>
        )
    }
}

PostList = withRouter(PostList)

export default connect(mapStateToProps)(PostList);