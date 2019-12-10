import React from 'react';
import { connect } from 'react-redux'
import { MODAL_IDS } from '../actions/ModalActions';
import { getPosts, resetPosts } from '../actions/PostActions';
import { withRouter } from 'react-router-dom'

import { showModal } from '../actions/ModalActions';


const mapStateToProps = (state, ownProps) => ({ posts: state.Posts.posts, token: state.Login.token, userId: state.Login.userId });

class SearchLanding extends React.Component {
    state = {
        searchInput: ""
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(resetPosts())
    }
    
    onSearchSubmitBtnClick = () => {
        this.props.dispatch(getPosts(this.state.searchInput, this.props.userId))
        this.props.history.push("/posts")
    };
    
    onSearchInputKeyEvent = (event) => {
        if (event.key === 'Enter') {
            this.props.dispatch(getPosts(event.target.value, this.props.userId));
            // TODO: add userid
            this.props.history.push("/posts")
        }
    };
    
    render() { 
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm pt-3">
                        <h1 className="display-2 text-center mb-5">stackl</h1>
                        <div className="input-group mb-5 mw-450 mx-auto">
                            <input className="form-control" value={this.state.searchInput} onChange={e => this.setState({ searchInput: e.target.value })} onKeyPress={(e)=> this.onSearchInputKeyEvent(e)} type="text" placeholder="Search the Q&A's..." />
                            <span className="input-group-append">
                                <button className="btn btn-outline-primary" onClick={() => this.onSearchSubmitBtnClick()} type="button">Submit</button>
                            </span>
                        </div>
                        {
                            !this.props.token ?
                                <span>
                                    <button className="btn btn-primary btn-block mx-auto mw-300" onClick={this.props.dispatch.bind(null, showModal(MODAL_IDS.LOGIN))} >Login</button>
                                    <button className="btn btn-primary btn-block mx-auto mw-300" onClick={this.props.dispatch.bind(null, showModal(MODAL_IDS.REGISTER))} >Register</button>
                                </span>
                                : null
                        }
    
                        {
                            this.props.posts !== null ?
                                <div>
                                    {
                                        this.props.posts.map((p, i) => {
                                            return <p key={i}>{p.body}</p>
                                        })
                                    }
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

SearchLanding = withRouter(SearchLanding)

export default connect(mapStateToProps)(SearchLanding);