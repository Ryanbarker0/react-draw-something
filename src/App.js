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
import UserDraw from './components/UserDraw'
import GuestCreate from './components/GuestCreate'
import GuestPlay from './components/GuestPlay'
import API from './API'

class App extends Component {

  state = {
    id: undefined,
    username: ''
  }

  login = user => {
    localStorage.setItem('token', user.token)
    this.setState({ id: user.id, username: user.username })
  }

  logout = () => {
    localStorage.removeItem('token')
    this.setState({ username: '' })
  }

  returnToHome = () => {
    this.props.history.push('/')
  }

  navigateGuestCreate = () => {
    this.props.history.push('/guest/create')
  }

  navigateGuestPlay = () => {
    this.props.history.push('/guest/play')
  }

  navigateUserDraw = () => {
    this.props.history.push('/user/draw')
  }

  navigateLogin = () => {
    this.props.history.push('/login')
  }

  navigateSignup = () => {
    this.props.history.push('/signup')
  }

  componentDidMount() {
    API.validate()
      .then(data => {
        if (data.error) {
          this.logout()
        } else {
          this.login(data)
          this.props.history.push('/home')
        }
      })
  }

  render() {
    const { login, logout } = this
    const { username, id } = this.state
    return (
        <div className="App">
        <NavBar navigateLogin={this.navigateLogin} navigateSignup={this.navigateSignup} username={username} logout={logout}/>    
        <Switch >
          <React.Fragment>
            <Route exact path="/" component={routerProps => <Home username={username} navigateGuestCreate={this.navigateGuestCreate} navigateGuestPlay={this.navigateGuestPlay} navigateUserDraw={this.navigateUserDraw} {...routerProps}/>} />
            <Route exact path="/login" component={routerProps => <Login login={login} returnToHome={this.returnToHome} {...routerProps} />} />
            <Route exact path="/signup" component={routerProps => <Signup navigateLogin={this.navigateLogin} {...routerProps} />} />
            <Route exact path="/user/draw" component={routerProps => <UserDraw userId={id} navigateUserDraw={this.navigateUserDraw} {...routerProps} />} />
            <Route exact path="/guest/create" component={routerProps => <GuestCreate {...routerProps}/>} />
            <Route exact path="/guest/play" component={routerProps => <GuestPlay {...routerProps}/>} />
          </React.Fragment>
          </Switch>
          </div>

    );
  }
}

export default withRouter(App);

