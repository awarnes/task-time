import React, { Component } from 'react'
import {
  Tab,
  Tabs,
  AppBar
} from '@material-ui/core'
import EventDisplay from './EventDisplay'

class ReportScreen extends Component {
  state = {
    selectedTab: 0
  }

  handleTabChange = (evt, selectedTab) => {
    this.setState({selectedTab})
  }

  render () {
    const { selectedTab } = this.state
    const { userData, deleteTaskEvent, history } = this.props
    return (
      <div>
        <AppBar position="static">
          <Tabs value={selectedTab} onChange={this.handleTabChange} variant="fullWidth">
            <Tab value={0} label="Charts"/>
            <Tab value={1} label="Raw Events"/>
          </Tabs>
          {selectedTab === 0 && <p>CHARTS</p>}
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