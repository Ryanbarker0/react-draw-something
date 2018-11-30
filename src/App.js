import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import './App.css';

import Home from './components/Home'
import Login from './components/Login'
import GuestCreate from './components/GuestCreate'
import GuestPlay from './components/GuestPlay'

class App extends Component {

  returnToHome = () => {
    this.props.history.push('/')
  }

  navigateGuestCreate = () => {
    this.props.history.push('/guest/create')
  }

  navigateGuestPlay = () => {
    this.props.history.push('/guest/play')
  }

  render() {
    return (
        <div className="App">
        
        <Switch >
          <React.Fragment>
            <Route exact path="/" component={routerProps => <Home navigateGuestCreate={this.navigateGuestCreate} navigateGuestPlay={this.navigateGuestPlay} {...routerProps}/>} />
            <Route exact path="/login" component={routerProps => <Login returnToHome={this.returnToHome} {...routerProps} />} />
            <Route exact path="/guest/create" component={routerProps => <GuestCreate {...routerProps}/>} />
            <Route exact path="/guest/play" component={routerProps => <GuestPlay {...routerProps}/>} />
          </React.Fragment>
          </Switch>
          </div>

    );
  }
}

export default withRouter(App);

