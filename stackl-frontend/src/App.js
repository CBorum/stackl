import React from 'react';
import { connect } from 'react-redux'

import './scss/index.scss';
import { startTest } from './actions/TestActions';

const mapStateToProps = (state, ownProps) => {
  return {
    test: state.Test.test
  }
}

class App extends React.Component {

  state = {

  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startTest("hej med dig"))
  }

  render() {
    console.log(this.props.test)
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


App = connect(mapStateToProps)(App)
export default App;