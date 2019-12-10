import React from 'react';
import { connect } from 'react-redux'
import '../scss/index.scss';
import store from '../store';

const mapStateToProps = (state) => ({
    savedPosts: state.SavedPost.savedPosts
});

function SavedPosts(props){
    return (
        <div className="col-xs-12 pt-2">
            <h3>Saved Posts</h3>
            <div className="list-group list-group-flush">
                {
                    props.savedPosts !== null && props.savedPosts.length > 0 ?
                        props.savedPosts.map(savedPost => (
                            <div className="list-group-item px-0">
                                <a key={savedPost.postId} href={`#/post/${savedPost.postId}`}>
                                    <h5>{savedPost.postTitle}</h5>
                                    {!!savedPost.note ? <p className="text-muted small font-italic mb-0">"{savedPost.note}"</p> : null}
                                </a>
                            </div>

                        ))
                        :
                        <p className="text-muted text-center font-italic">You have not saved any posts yet</p>
                }
            </div>

        </div>

    )
}

export default connect(mapStateToProps)(SavedPosts);