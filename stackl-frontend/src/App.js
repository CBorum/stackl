import React from 'react';
import { connect } from 'react-redux'
import SearchLanding from './components/SearchLanding';
import ModalBackdrop from './components/modals/ModalBackdrop';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import './scss/index.scss';
import { startTest } from './actions/TestActions';


const mapStateToProps = (state, ownProps) => ({test: state.Test.test});

class App extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startTest("hej med dig"))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
          <div className="container">
              <div className="row">
                  <div className="col-sm">
                      <h1>stackl med boisen</h1>
                  </div>
                  <div className="col-sm">
                      <h2>sidebar</h2>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);