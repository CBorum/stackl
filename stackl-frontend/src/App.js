import React from 'react';
import { connect } from 'react-redux'
import SearchLanding from './components/SearchLanding';
import ModalBackdrop from './components/modals/ModalBackdrop';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import './scss/index.scss';
import { startTest } from './actions/TestActions';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost';

const mapStateToProps = (state, ownProps) => ({ test: state.Test.test });

class App extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(startTest("hej med dig"));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Switch>
              <Route exact path="/">
                <SearchLanding />
              </Route>
              <Route exact path="/posts">
                <div className="col-md-12">
                  <PostList />
                </div>
              </Route>
              <Route exact path="/post/:postId">
                <SinglePost />
              </Route>
            </Switch>
          </div>
          {1 == 2 ? (<ModalBackdrop />) : ''}
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);