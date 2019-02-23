import React, {Component} from 'react'

import {
  Button, Typography
} from "@material-ui/core"

export default class LoginPage extends Component {

  render () {
    const { login } = this.props
    return (
      <div>
        <Typography variant="h1">
          Welcome to TaskTime!
        </Typography>
        <Typography variant="h3">
          Please login below.
        </Typography>
        <br/>
        <br/>
        <br/>
        <Button onClick={login}>
          <Typography variant="h3">
            Login with Google!
          </Typography>
        </Button>
      </div>
    )
  }
}
