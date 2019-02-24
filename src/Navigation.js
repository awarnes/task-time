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

  render() {
    const { user, toggleNavDrawer, navOpen, history } = this.props
    return (
      <div>
        <NavBar
          user={user}
          toggleNavDrawer={toggleNavDrawer}
          handleNavAuth={this.handleNavAuth}
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