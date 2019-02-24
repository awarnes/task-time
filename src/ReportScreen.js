import React, { Component } from 'react'

import {
  Tab,
  Tabs,
  AppBar
} from '@material-ui/core'

class ReportScreen extends Component {

  state = {
    selectedTab: 0
  }

  handleTabChange = (evt, selectedTab) => {
    this.setState({selectedTab})
  }

  render () {
    const { selectedTab } = this.state
    return (
      <div>
        <AppBar position="static">
          <Tabs value={selectedTab} onChange={this.handleTabChange}>
            <Tab value={0} label="Charts"/>
            <Tab value={1} label="Raw Events"/>
          </Tabs>
          {selectedTab === 0 && <p>CHARTS</p>}
          {selectedTab === 1 && <p>RAW EVENTS</p>}
        </AppBar>
      </div>
    )
  }
}

export default ReportScreen