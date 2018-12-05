import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import pencilLogo from './assets/pencils_2.png'
import words from './words'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import UserDraw from './components/UserDraw'
import MyGames from './components/MyGames'
import UserPlay from './components/UserPlay'
import GuestCreate from './components/GuestCreate'
import GuestPlay from './components/GuestPlay'
import API from './API'

class App extends Component {

  state = {
    id: undefined,
    username: '',
    playGameObject: undefined,
    targetUserId: undefined,
    isNewGame: true,
    game: undefined,
    words: words,
    userProfileToEdit: undefined,
    defaultProfileImage: 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
  }

  login = user => {
    localStorage.setItem('token', user.token)
    this.setState({ id: user.id, username: user.username, targetUserId: '', isNewGame: true })
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

  navigateUserPlay= () => {
    this.props.history.push('/user/play')
  }

  navigateMyGames = () => {
    this.props.history.push('/mygames')
  }

  navigateLogin = () => {
    this.props.history.push('/login')
  }

  navigateSignup = () => {
    this.props.history.push('/signup')
  }
  
  navigateProfile = () => {
    this.props.history.push('/profile')
  }

  navigateEditProfile = () => {
    this.props.history.push('/profile/edit')
  }

  updatePlayGameObject = object => {
    this.setState({ playGameObject: object })
  }

  updateTargetUserId = userId => {
    this.setState({ targetUserId: userId})
  }

  updateIsNewGame = bool => {
    this.setState({ isNewGame: bool })
  }

  updateGameInState = game => {
    this.setState({ game })
  }
  
  updateProfileImage = (newImage) => {
    this.setState({ defaultProfileImage: newImage })
  }

  updateUserProfileToEdit = user => {
    this.setState({ userProfileToEdit: user })
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
    const { login, logout, updateProfileImage, updateUserProfileToEdit } = this
    const { username, id, userProfileToEdit, defaultProfileImage } = this.state
    return (
        <div>
        <NavBar pencilLogo={pencilLogo} navigateLogin={this.navigateLogin} navigateSignup={this.navigateSignup} navigateMyGames={this.navigateMyGames} username={username} logout={logout} navigateProfile={this.navigateProfile}/>    
        <Switch >
          <React.Fragment>
            <Route exact path="/" component={routerProps => <Home username={username} pencilLogo={pencilLogo} navigateGuestCreate={this.navigateGuestCreate} navigateGuestPlay={this.navigateGuestPlay} navigateUserDraw={this.navigateUserDraw} {...routerProps}/>} />
            <Route exact path="/login" component={routerProps => <Login login={login} returnToHome={this.returnToHome} {...routerProps} />} />
            <Route exact path="/signup" component={routerProps => <Signup returnToHome={this.returnToHome} navigateLogin={this.navigateLogin} {...routerProps} />} />
            <Route exact path="/mygames" render={routerProps => (
              !username ? (
                <Redirect to="/" />
              ) : (
              <MyGames navigateUserPlay={this.navigateUserPlay} userId={id} {...routerProps} updatePlayGameObject={this.updatePlayGameObject} /> )
              )} />
            
            <Route exact path="/profile" render={routerProps => (
              !username ? (
                <Redirect to="/" />
              ) : (
              <Profile userId={id} updateUserProfileToEdit={updateUserProfileToEdit} defaultProfileImage={defaultProfileImage} navigateEditProfile={this.navigateEditProfile} {...routerProps} /> )
              )} />
            <Route exact path="/profile/edit" render={routerProps => (
              !username ? (
                <Redirect to="/" />
              ) : (
              <EditProfile userProfileToEdit={userProfileToEdit} updateProfileImage={updateProfileImage} {...routerProps} /> )
              )} />
            
            <Route exact path="/user/play" render={routerProps => (
              !username ? (
                <Redirect to="/" />
              ) : (
              <UserPlay userId={id} playGameObject={this.state.playGameObject} isNewGame={this.state.isNewGame} updateGameInState={this.updateGameInState} updateTargetUserId={this.updateTargetUserId} updateIsNewGame={this.updateIsNewGame} {...routerProps} /> )
            )} />
            <Route exact path="/user/draw" render={routerProps => (
                !username ? (
                <Redirect to="/" /> 
                ) : (
                <UserDraw userId={id} words={this.state.words} navigateUserDraw={this.navigateUserDraw} isNewGame={this.state.isNewGame} targetUserId={this.state.targetUserId} game={this.state.game}  {...routerProps} /> )
            )} />
            <Route exact path="/guest/create" component={routerProps => <GuestCreate words={this.state.words} {...routerProps}/>} />
            <Route exact path="/guest/play" component={routerProps => <GuestPlay {...routerProps}/>} />
          </React.Fragment>
          </Switch>
          </div>

    );
  }
}

export default withRouter(App);

