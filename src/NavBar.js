import React, { Component } from 'react'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  withStyles
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavBar extends Component {
  render() {
    const { user, toggleNavDrawer, handleNavAuth, currentScreen, classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" onClick={toggleNavDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {currentScreen}
            </Typography>
            <Button color="inherit" onClick={handleNavAuth}>{user ? "Log Out" : "Log In"}</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(NavBar);