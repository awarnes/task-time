import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Tab,
  Tabs,
  AppBar
} from '@material-ui/core'
import { Redirect } from "react-router-dom"
import EventDisplay from '../containers/EventDisplay'
import BasicChart from '../components/BasicChart'


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

ReportScreen.propTypes = {
  user: PropTypes.object,
  userData: PropTypes.object,
  history: PropTypes.object,
  deleteTaskEvent: PropTypes.func
}

export default ReportScreen