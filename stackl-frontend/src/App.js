import React from 'react';
import { connect } from 'react-redux'
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import './scss/index.scss';

import SearchLanding from './components/SearchLanding';
import ModalBackdrop from './components/modals/ModalBackdrop';

import './scss/index.scss';
import { startTest } from './actions/TestActions';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost';

import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';


const mapStateToProps = (state, ownProps) => ({currentModalId: state.currentModalId});

class App extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container-fluid">
            <Switch>
              <Route exact path="/">
                <SearchLanding />
              </Route>
              <Route exact path="/posts">
                <div className="col-12">
                  <PostList />
                </div>
              </Route>
              <Route exact path="/post/:postId">
                <SinglePost />
              </Route>
            </Switch>
          </div>
            {this.props.currentModalId !== undefined ? (<ModalBackdrop/>) : ''}
            <LoginModal/>
            <RegisterModal/>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);