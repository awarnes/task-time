import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Paper } from '@material-ui/core';

import fire, { auth, provider } from '../utilities/firebaseConfig';

import SplashPage from './SplashPage'
import UserDashboard from './UserDashboard'
import Navigation from './Navigation'
import ReportScreen from './ReportScreen'

class App extends Component {
  state = {
    user: null,
    userData: {},
    navOpen: false
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        fire.database().ref('users/').once('value')
          .then(snapshot => snapshot.val())
          .then(data => {
            if (data && !data[user.uid]) {
              data[user.uid] = {taskTypes: [], taskEvents: []}
              fire.database().ref('users/').set(data)
            }
            this.setState({user},
              () => { this.getUserInformation() }
            )
          })
          .catch(console.error) // eslint-disable-line
      }
    })
    fire.database().ref(`users/`).on('value', this.updateUserData)
  }

  componentWillUnmount() {
    fire.database().ref(`users/`).off(this.updateUserData)
  }
  
  updateUserData = snapshot => {
    const newUserData = this.state.user && snapshot.val()[this.state.user.uid]
    this.setState({
      userData: newUserData
    })
  }

  getUserInformation () {
    fire.database().ref(`/users/${this.state.user.uid}`).once('value')
      .then(dataSnapshot => {
        const userData = dataSnapshot.val() ? dataSnapshot.val() : []
        this.setState({userData})
      })
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user
        this.setState({user})
      })
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
        })
      })
  }

  toggleNavDrawer = () => {
    this.setState({navOpen: !this.state.navOpen})
  }

  addTaskType = async (name) => {
    let addedNewType = false;
    if (!name) return addedNewType;

    const taskTypeRef = fire.database().ref(`/users/${this.state.user.uid}/taskTypes`)
    await taskTypeRef.once('value')
      .then(snapshot => snapshot.val())
      .then(data => {
        if (!data || !Object.values(data).includes(name)) {
          taskTypeRef.push(name)
          addedNewType = true;
        }
      })

    return addedNewType
  }

  deleteTaskType = (key) => {
    fire.database().ref(`/users/${this.state.user.uid}/taskTypes/${key}`).remove()
  }
  

  addTaskEvent = (eventData) => {
    fire.database().ref(`/users/${this.state.user.uid}/taskEvents`).push(eventData)
  }

  deleteTaskEvent = (key) => {
    fire.database().ref(`/users/${this.state.user.uid}/taskEvents/${key}`).remove()
  }

  render() {

    const { user, userData, navOpen } = this.state
    return (
      <Router>
        <Paper>
          <Route path='/' render={props => (
            <Navigation
              {...props}
              user={user}
              navOpen={navOpen}
              toggleNavDrawer={this.toggleNavDrawer}
              logIn={this.login}
              logOut={this.logout}
            />
          )} />
        
          <Route exact path='/'
            render={(props) => (
              user ?
                <Redirect to={`/dashboard`} />
                :
                <SplashPage {...props} />
            )}
          />
          
          <Route exact path={`/dashboard`}
            render={props => (
              <UserDashboard
                {...props}
                user={user}
                userData={userData}
                addTaskType={this.addTaskType}
                deleteTaskType={this.deleteTaskType}
                addTaskEvent={this.addTaskEvent}
                deleteTaskEvent={this.deleteTaskEvent}
              />
            )}
          />

          <Route exact path={`/reports`}
            render={props => (
              <ReportScreen
                {...props}
                user={user}
                userData={userData}
                deleteTaskEvent={this.deleteTaskEvent}
              />
            )}
          />

        </Paper>
      </Router>
    );
  }
}

export default App;
