import React from 'react';
import { connect } from 'react-redux'
import '../scss/index.scss';
import store from '../store';

const mapStateToProps = (state) => ({
    savedPosts: state.SavedPost.savedPosts
});

function SavedPosts(props){
    return (
        <div className="col-xs-12">
            {
                props.savedPosts !== null && props.savedPosts.length > 0 ?
                    props.savedPosts.map(savedPost => (
                        <button className="btn btn-link">en gemt post</button>
                    ))
                    :
                    <p className="text-muted text-center font-italic">You have not saved any posts yet</p>
            }
        </div>

    )
}

export default connect(mapStateToProps)(SavedPosts);