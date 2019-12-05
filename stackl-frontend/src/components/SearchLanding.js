import React from 'react';
import { connect } from 'react-redux'
import { showModal, MODAL_IDS } from '../js/modals';
import { getPosts } from '../actions/PostActions';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => ({ posts: state.Posts.posts });


const searchInputId = 'search-field';

const onSearchSubmitBtnClick = (props) => {
    const searchInput = document.getElementById(searchInputId);
    const searchEntry = searchInput.value;

    props.dispatch(getPosts(searchEntry))
    props.history.push("/posts")
};

const postSearch = (searchEntry) => {
    console.log(`postSearch(${searchEntry})`);
    // should make an http request to the server, and update the store with results
};

const onSearchInputKeyEvent = (event) => {
    console.log('onSearchInputKeyEvent()');
    if (event.key === 'Enter') {
        postSearch(event.target.value);
    }
};

function SearchLanding(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm pt-3">
                    <h1 className="text-center mb-5">stackl</h1>
                    <div className="input-group mb-5 mw-450 mx-auto">
                        <input id={searchInputId} className="form-control" onKeyPress={onSearchInputKeyEvent} type="text" placeholder="Search the Q&A's..." />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" onClick={() => onSearchSubmitBtnClick(props)} type="button">Submit</button>
                        </span>
                    </div>
                    <button className="btn btn-primary btn-block mx-auto mw-300" onClick={showModal.bind(null, MODAL_IDS.LOGIN)} >Login</button>
                    <button className="btn btn-primary btn-block mx-auto mw-300" onClick={showModal.bind(null, MODAL_IDS.REGISTER)} >Register</button>
                    {
                        props.posts !== null ?
                            <div>
                                {
                                    props.posts.map((p, i) => {
                                        return <p key={i}>{p.body}</p>
                                    })
                                }
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    );
}

SearchLanding = withRouter(SearchLanding)

export default connect(mapStateToProps)(SearchLanding);