import React, { Component } from 'react'
import moment from 'moment-timezone'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import Alert from './Alert'

class TimeDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      alertOpen: false,
      currentEvent: ""
    }
  }

  displayTime = (time) => {
    const milliseconds = time % 1000;
    const seconds = parseInt(time = time/1000)%60;
    const minutes = parseInt(time = time/60)%60;
    const hours = parseInt(time = time/60)%24;
    const days = parseInt(time = time/24);

    return [days, hours, minutes, seconds, milliseconds].join(":");
  }

  toggleAlert = (evtKey) => {
    if (!this.state.alertOpen) {
      this.setState({
        currentEvent: evtKey,
        alertOpen: true
      })
    } else {
      this.setState({alertOpen: false})
    }
  }

  render() {
    const { userData, deleteTaskEvent } = this.props
    const { alertOpen } = this.state
    const taskRows = Object.keys(userData.taskEvents).map(eventKey => {
      let eventData = userData.taskEvents[eventKey]
      
      return (
        <TableRow key={eventKey}>
          <TableCell>{eventData.type}</TableCell>
          <TableCell>{moment(eventData.startTime).tz(eventData.timeZone).format("D/M/YYYY h:mm:ss a")}</TableCell>
          <TableCell>{moment(eventData.endTime).tz(eventData.timeZone).format("D/M/YYYY h:mm:ss a")}</TableCell>
          <TableCell>{this.displayTime(eventData.runningTime)}</TableCell>
          <TableCell><Button type="button" onClick={() => {this.toggleAlert(eventKey)}} style={{color: "red"}}>Delete Event</Button></TableCell>
        </TableRow>
      )
    })

    const totalTime = Object.keys(userData.taskEvents).reduce((total, eventKey) => {
      let eventData = userData.taskEvents[eventKey]
      return total += eventData.runningTime
    }, 0)

    const timeByTask = Object.entries(Object.keys(userData.taskEvents).reduce((total, eventKey) => {
      let eventData = userData.taskEvents[eventKey]
      if (total[eventData.type]) {
        total[eventData.type] = total[eventData.type] + eventData.runningTime
      } else {
        total[eventData.type] = eventData.runningTime
      }
      return total
    }, [])).map(task => {
      return (
        <TableRow key={`${task[0]}-totals`}>
          <TableCell>{task[0]}</TableCell>
          <TableCell>{this.displayTime(task[1])}</TableCell>
        </TableRow>
      )
    })

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Total Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskRows}
            <TableRow>
              <TableCell colSpan={3}>Total Time:</TableCell>
              <TableCell>{this.displayTime(totalTime)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br/>
        <br/>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Total Task Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeByTask}
          </TableBody>
        </Table>
        <Alert
          deleteContext={{
            type: "Event",
            text: "delete this event"
          }}
          alertOpen={alertOpen}
          handleCancel={this.toggleAlert}
          handleAccept={() => {
            deleteTaskEvent(this.state.currentEvent)
            this.toggleAlert()
          }}
        />
      </div>
    )
  }
}

export default TimeDisplay;