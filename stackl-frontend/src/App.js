import React from 'react';
import { connect } from 'react-redux'
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import SearchLanding from './components/SearchLanding';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost';
import SearchNavBar from './components/SearchNavBar';
import SideBar from './components/SideBar';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import Loader from './components/Loader';
import WordCloud from './components/WordCloud';

const mapStateToProps = (state) => ({ currentModalId: state.currentModalId });

class App extends React.Component {

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container-fluid">
            <div className="row">
              <SearchNavBar />
            </div>
            <div className="row">
              <Switch>
                <Route exact path="/">
                  <SearchLanding />
                </Route>
                <Route exact path="/posts">
                  <PostList />
                </Route>
                <Route exact path="/post/:postId">
                  <SinglePost />
                </Route>
                <Route exact path="/words">
                  <WordCloud />
                </Route>
              </Switch>
              <SideBar />
            </div>
          </div>
          <LoginModal />
          <RegisterModal />
          <Loader></Loader>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);