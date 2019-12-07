import React from 'react';
import { connect } from 'react-redux'

import '../scss/index.scss';
import { getPostsDone, resetPosts} from '../actions/PostActions';

const mapStateToProps = (state, ownProps) => ({ posts: state.Posts.posts });

class PostList extends React.Component {
    state = {
        openedIndices: {},
    }

    expandPost(i) {
        const obj = this.state.openedIndices
        if (obj[i]) delete obj[i];
        else obj[i] = true;
        this.setState({ openedIndices: obj })
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(resetPosts())
    }

    render() {
        if (!this.props.posts) return null
        console.log(this.props.posts)
        return (
            <div className="col-9">
                <ul className="list-group list-group-flush">
                    {
                        this.props.posts.map((p, i) => {
                            // return <PostContainer key={i} expandPost={() => this.expandPost(i)} expanded={this.state.openedIndices[i]} body={p.body} />
                            return <li className={`list-group-item ${this.state.openedIndices[i] ? 'bg-light' : ""}`} key={i}><PostContainer expandPost={() => this.expandPost(i)} expanded={this.state.openedIndices[i]} post={p} /></li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

class PostContainer extends React.Component {
    state = {}

    render() {
        const { post, expanded } = this.props
        return (
            <div className="row">
                <div className="col-1">
                    <div>
                        <div className="p-2 text-align-center">
                            <h4>{post.score}</h4>
                            <div>votes</div>
                        </div>
                        <div className="p-2 text-align-center">
                            <h4>{post.answers ? post.answers : 0}</h4>
                            <div>answers</div>
                        </div>
                    </div>
                </div>
                <div className="col-11">
                    <div className="p-2" onClick={this.props.expandPost} style={{ cursor: "pointer" }}>
                        <h4 className="display-6"><a href={`#/post/${post.postId}`}>{post.title ? post.title : post.parentTitle}</a></h4>
                        <div className="mt-4"></div>
                        <div className={`${expanded ? "" : "post-list-height"}`} dangerouslySetInnerHTML={{ __html: post.body }}></div>
                        {/* <button type="button" className="btn btn-primary btn-sm mt-3" onClick={this.props.expandPost} >Show {expanded ? "less" : "more"}</button> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(PostList);