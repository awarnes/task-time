import React, { Component } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  withStyles,
  Button
} from "@material-ui/core"

const styles = {
  list: {
    width: 250,
    textAlign: "center"
  },
  authButton: {
    width: "100%"
  }
}

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
    const navItems = ["Dashboard", "Reports"].map((text) => {
      return (
        <ListItem button key={text} onClick={() => {this.handleNav(text)}}>
          <ListItemText primary={text} />
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
              </ListItem>
              { user ? navItems : <div/> }
            </List>
            <Divider />
            <List>
              <Button onClick={handleNavAuth} className={classes.authButton}>
                { user ? "Log Out" : "Log In" }
              </Button>
            </List>
          </div>
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(NavDrawer)