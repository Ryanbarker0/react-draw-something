import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
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

  navigateLogin = () => {
    this.props.history.push('/login')
  }

  navigateSignup = () => {
    this.props.history.push('/signup')
  }

  render() {
    return (
        <div className="App">
        <NavBar navigateLogin={this.navigateLogin} navigateSignup={this.navigateSignup}/>    
        <Switch >
          <React.Fragment>
            <Route exact path="/" component={routerProps => <Home navigateGuestCreate={this.navigateGuestCreate} navigateGuestPlay={this.navigateGuestPlay} {...routerProps}/>} />
            <Route exact path="/login" component={routerProps => <Login returnToHome={this.returnToHome} {...routerProps} />} />
            <Route exact path="/signup" component={routerProps => <Signup returnToHome={this.returnToHome} {...routerProps} />} />
            <Route exact path="/guest/create" component={routerProps => <GuestCreate {...routerProps}/>} />
            <Route exact path="/guest/play" component={routerProps => <GuestPlay {...routerProps}/>} />
          </React.Fragment>
          </Switch>
          </div>

    );
  }
}

export default withRouter(App);

