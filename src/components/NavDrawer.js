import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  withStyles,
  Button
} from "@material-ui/core"

import TimerIcon from "@material-ui/icons/Timer"
import DescriptionIcon from "@material-ui/icons/Description"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"

const styles = {
  list: {
    width: 250,
    textAlign: "center"
  },
  authButton: {
    width: "100%"
  }
}

const navigationItems = [
  {
    text:"Dashboard",
    icon:<TimerIcon />
  },
  {
    text: "Reports",
    icon:<DescriptionIcon />
  }
]

class NavDrawer extends Component {
  handleNav = (location) => {
    const { history } = this.props
    switch(location) {
      case "Reports":
        return history.push(`/reports`)
      case "Dashboard":
      default:
        return history.push(`/dashboard`)
    }
  }

  render() {
    const { navOpen, user, toggleNavDrawer, handleNavAuth, classes } = this.props
    const navItems = navigationItems.map((item) => {
      return (
        <ListItem button key={item.text} onClick={() => {this.handleNav(item.text)}}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      )
    })

    return (
      <Drawer open={navOpen} onClose={toggleNavDrawer}>
        <div
          tabIndex={0}
          role="button"
          onClick={toggleNavDrawer}
          onKeyDown={toggleNavDrawer}
        >
          <div className={classes.list}>
            <List>
              <ListItem key="navBarTitle">
                <ListItemText primary="TaskTime" />
                <ListItemIcon><ArrowBackIosIcon /></ListItemIcon>
              </ListItem>
              <Divider />
              { user ? navItems : <div/> }
            </List>
            <Divider />
            { user ? 
            <List>
              <ListItem key="userWelcome">
                <ListItemText primary={`Welcome, ${user.displayName}!`} />
              </ListItem>
              <Button onClick={handleNavAuth} className={classes.authButton}>
                Log Out
              </Button>
            </List>
            :
            <List>
              <Button onClick={handleNavAuth} className={classes.authButton}>
                Log In
              </Button>
            </List>
            }
          </div>
        </div>
      </Drawer>
    )
  }
}

NavDrawer.propTypes = {
  user: PropTypes.object.isRequired,
  toggleNavDrawer: PropTypes.func.isRequired,
  handleNavAuth: PropTypes.func.isRequired,
  navOpen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withStyles(styles)(NavDrawer)