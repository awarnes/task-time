import React, { Component } from 'react'

import NavBar from './NavBar'
import NavDrawer from './NavDrawer'

class Navigation extends Component {

  handleNavAuth = () => {
    const { user, logIn, logOut } = this.props

    if (user) {
      logOut()
    } else {
      logIn()
    }
  }

  getCurrentScreen = (location) => {
    return location.pathname.replace("/", "").toUpperCase()
  }

  render() {
    const { user, toggleNavDrawer, navOpen, history } = this.props
    const currentScreen = this.getCurrentScreen(this.props.location)
    return (
      <div>
        <NavBar
          user={user}
          toggleNavDrawer={toggleNavDrawer}
          handleNavAuth={this.handleNavAuth}
          currentScreen={currentScreen}
        />
        <NavDrawer
          user={user}
          navOpen={navOpen}
          history={history}
          toggleNavDrawer={toggleNavDrawer}
          handleNavAuth={this.handleNavAuth}
        />
      </div>
    )
  }
}

export default Navigation