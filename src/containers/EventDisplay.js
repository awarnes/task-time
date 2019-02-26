import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import { DateTimePicker } from 'material-ui-pickers'
import moment from 'moment-timezone'

import Alert from '../components/Alert'
import Event from '../components/Event'
import { displayTime } from '../utilities/Utilities'

const styles = {
  eventTable: {
    backgroundColor: "white"
  },
  card: {
    display: "flex",
    justifyContent: "center"
  },
  dateTimePicker: {
    margin: "5px",
    padding: "5px",
  },
  newEventContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}

class EventDisplay extends Component {
  state = {
    alertOpen: false,
    currentEvent: "",
    addEventOpen: false,
    newEventStart: moment(),
    newEventEnd: moment(),
    newEventType: ""
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

  toggleNewEventDialog = () => {
    this.setState({addEventOpen: !this.state.addEventOpen})
  }

  handleAddNewTaskEvent = () => {
    if (!this.state.newEventType) return;
    const newTask = {
      endTime: moment(this.state.newEventEnd).valueOf(),
      startTime: moment(this.state.newEventStart).valueOf(),
      timeZone: "America/Los_Angeles",
      type: this.state.newEventType,
    }
    this.props.addTaskEvent(newTask)
    this.setState({
      addEventOpen: false,
      newEventType: "",
      newEventStart: moment(),
      newEventEnd: moment()
    })
  }

  handleUpdateTypeValue = (evt) => {
    this.setState({newEventType: evt.target.value})
  }

  handleUpdateStartTimeValue = (newValue) => {
    this.setState({newEventStart: newValue})
  }

  handleUpdateEndTimeValue = (newValue) => {
    this.setState({newEventEnd: newValue})
  }

  render() {
    const { userData, deleteTaskEvent, history, classes, updateTaskEvent } = this.props
    const { alertOpen, addEventOpen, newEventStart, newEventEnd, newEventType } = this.state

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
        <Event
          key={eventKey}
          eventKey={eventKey}
          eventData={eventData}
          toggleAlert={this.toggleAlert}
          updateTaskEvent={updateTaskEvent}
        />
      )
    })

    const totalTime = Object.keys(userData.taskEvents).reduce((total, eventKey) => {
      let eventData = userData.taskEvents[eventKey]
      return total += (eventData.endTime - eventData.startTime)
    }, 0)

    return (
      <div>
        <Button onClick={this.toggleNewEventDialog}>
          Add New Task Event
        </Button>
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
        <Button onClick={this.toggleNewEventDialog}>
          Add New Task Event
        </Button>
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

        <Dialog
          open={addEventOpen}
          onClose={this.toggleNewEventDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add a new task event!</DialogTitle>
          <DialogContent>
            <div className={classes.newEventContainer}>
              <TextField
                id="taskType"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!newEventType}
                className={classes.typeText}
                value={newEventType}
                onChange={this.handleUpdateTypeValue}
              />
              <DateTimePicker
                autoOk
                showTodayButton
                allowKeyboardControl
                className={classes.dateTimePicker}
                value={newEventStart}
                onChange={this.handleUpdateStartTimeValue}
              />
              <DateTimePicker
                autoOk
                showTodayButton
                allowKeyboardControl
                className={classes.dateTimePicker}
                value={newEventEnd}
                onChange={this.handleUpdateEndTimeValue}
              />
              {displayTime(newEventEnd - newEventStart)}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleNewEventDialog} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={this.handleAddNewTaskEvent} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

EventDisplay.propTypes = {
  userData: PropTypes.object,
  history: PropTypes.object,
  classes: PropTypes.object,
  deleteTaskEvent: PropTypes.func,
  updateTaskEvent: PropTypes.func,
  addTaskEvent: PropTypes.func
}

export default withStyles(styles)(EventDisplay)