import React, { Component } from 'react'
import {
  Tab,
  Tabs,
  AppBar
} from '@material-ui/core'
import { Redirect } from "react-router-dom"
import EventDisplay from './EventDisplay'
import BasicChart from './BasicChart'


class ReportScreen extends Component {
  state = {
    selectedTab: 0
  }

  handleTabChange = (evt, selectedTab) => {
    this.setState({selectedTab})
  }

  render () {
    const { selectedTab } = this.state
    const { userData, deleteTaskEvent, user, history } = this.props
    if (!user) return <Redirect to={`/`}/>

    return (
      <div>
        <AppBar position="static">
          <Tabs value={selectedTab} onChange={this.handleTabChange} variant="fullWidth">
            <Tab value={0} label="Charts" style={{height: "100%", width: "100%"}}/>
            <Tab value={1} label="Raw Events"/>
          </Tabs>
          {selectedTab === 0 && (
            <BasicChart
              userData={userData}
            />
          )}
          {selectedTab === 1 && (
            <EventDisplay
              userData={userData}
              deleteTaskEvent={deleteTaskEvent}
              history={history}
            />
          )}
        </AppBar>
      </div>
    )
  }
}

export default ReportScreen