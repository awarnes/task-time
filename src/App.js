import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import fire, { auth, provider } from './firebaseConfig';

import LoginPage from './LoginPage'
import UserDashboard from './UserDashboard'
import { Paper } from '@material-ui/core';
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: null,
      userName: "",
      userData: {}
    }
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
            this.setState({
              user,
              userName: user.displayName
            },() => { this.getUserInformation() })
          })
          .catch(console.error)
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
          user: null
        })
      })
  }

  addTaskType = async (name) => {
    const taskTypeRef = fire.database().ref(`/users/${this.state.user.uid}/taskTypes`)
    let addedNewType = false;
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
  

  newTaskEvent = (eventData) => {
    fire.database().ref(`/users/${this.state.user.uid}/taskEvents`).push(eventData)
  }

  deleteTaskEvent = (key) => {
    fire.database().ref(`/users/${this.state.user.uid}/taskEvents/${key}`).remove()
  }

  render() {

    const { user, userData, userName } = this.state
    return (
      <Router>
        <Paper>
          <Route exact path='/'
            render={(props) => (
              this.state.user ?
                (<Redirect to={`${user.uid}/dashboard`} />)
                :
                (<LoginPage {...props}
                  login={this.login}
                />)
            )}
          />
          
          <Route path={`/:uid/dashboard`}
            render={props => (
              <UserDashboard {...props}
                user={user}
                userName={userName}
                userData={userData}
                logOut={this.logout}
                addTaskType={this.addTaskType}
                deleteTaskType={this.deleteTaskType}
                newTaskEvent={this.newTaskEvent}
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
