import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import './App.css';

import Home from './components/Home'
import Login from './components/Login'

class App extends Component {

  returnToHome = () => {
    this.props.history.push('/')
  }

  render() {
    return (
        <div className="App">
        
        <Switch >
          <React.Fragment>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={routerProps => <Login returnToHome={this.returnToHome} {...routerProps} />} />
          </React.Fragment>
          </Switch>
          </div>

    );
  }
}

export default withRouter(App);

