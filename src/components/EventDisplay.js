import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Card,
  CardActions,
  CardContent,
  withStyles,
  Typography
} from '@material-ui/core'
import Alert from './Alert'
import { displayTime } from '../utilities/Utilities'

const styles = {
  eventTable: {
    backgroundColor: "white"
  },
  card: {
    display: "flex",
    justifyContent: "center"
  }
}

class EventDisplay extends Component {
  state = {
    alertOpen: false,
    currentEvent: ""
  }

  toggleAlert = (evtKey) => {
    if (!this.state.alertOpen) {
      this.setState({
        alertOpen: true,
        currentEvent: evtKey
      })
    } else {
      this.setState({alertOpen: false})
    }
  }

  render() {
    const { userData, deleteTaskEvent, history, classes } = this.props
    const { alertOpen } = this.state

    if (!userData || !userData.taskEvents) {
      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {"It looks like you haven't created any events yet."}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => {history.push("/dashboard")}}>
              Start a task!
            </Button>
          </CardActions>
        </Card>
      )
    }

    const taskRows = Object.keys(userData.taskEvents).map(eventKey => {
      let eventData = userData.taskEvents[eventKey]
      return (
        <TableRow key={eventKey}>
          <TableCell>
            {eventData.type}
          </TableCell>
          <TableCell>
            {moment(eventData.startTime).tz(eventData.timeZone).format("D/M/YYYY h:mm:ss a")}
          </TableCell>
          <TableCell>
            {moment(eventData.endTime).tz(eventData.timeZone).format("D/M/YYYY h:mm:ss a")}
          </TableCell>
          <TableCell>
            {displayTime(eventData.endTime - eventData.startTime)}
          </TableCell>
          <TableCell>
            <Button onClick={() => {this.toggleAlert(eventKey)}} style={{color: "red"}}>
              Delete Event
            </Button>
          </TableCell>
        </TableRow>
      )
    })

    const totalTime = Object.keys(userData.taskEvents).reduce((total, eventKey) => {
      let eventData = userData.taskEvents[eventKey]
      return total += (eventData.endTime - eventData.startTime)
    }, 0)

    return (
      <div>
        <Table className={classes.eventTable}>
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
              <TableCell>{displayTime(totalTime)}</TableCell>
            </TableRow>
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

EventDisplay.propTypes = {
  userData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  deleteTaskEvent: PropTypes.func.isRequired
}

export default withStyles(styles)(EventDisplay)