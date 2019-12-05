import React from 'react';
import { connect } from 'react-redux'

import '../scss/index.scss';

const mapStateToProps = (state, ownProps) => ({ posts: state.Posts.posts });

class PostList extends React.Component {

  componentDidMount() {
  }

  render() {
    console.log(this.props.posts);
    if (!this.props.posts) return null
    return (
        <div className="col-md-9">
            
        </div>
    );
  }
}

class PostContainer extends React.Component {
    state = {}

    render() {
        return(
            <div></div>
        )
    }
}

export default connect(mapStateToProps)(PostList);