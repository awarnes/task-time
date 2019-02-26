import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import {
  withStyles,
  TableRow,
  TableCell,
  Button,
  TextField
} from '@material-ui/core';
import { DateTimePicker } from 'material-ui-pickers'
import { displayTime } from '../utilities/Utilities'

const styles = {
  dateTimePicker: {
    margin: "5px",
    padding: "5px",
  }
}

class Event extends Component {
  constructor(props) {
    super(props)
    const {eventData} = this.props
    this.state = {
      newStartTimeValue: moment(eventData.startTime).tz(eventData.timeZone),
      newEndTimeValue: moment(eventData.endTime).tz(eventData.timeZone),
      newTypeValue: eventData.type
    }
  }
  

  handleUpdateTypeValue = (evt) => {
    this.setState({newTypeValue: evt.target.value})
  }

  handleUpdateStartTimeValue = (newValue) => {
    this.setState({newStartTimeValue: newValue})
  }

  handleUpdateEndTimeValue = (newValue) => {
    this.setState({newEndTimeValue: newValue})
  }

  render() {
    const { eventKey, toggleAlert, classes } = this.props
    const { newTypeValue, newStartTimeValue, newEndTimeValue } = this.state

    return (
      <TableRow className={classes.row}>
        <TableCell>
          <TextField
            id="taskType"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.typeText}
            value={newTypeValue}
            onChange={this.handleUpdateTypeValue}
          />
        </TableCell>
        <TableCell>
          <DateTimePicker
            autoOk
            showTodayButton
            allowKeyboardControl
            className={classes.dateTimePicker}
            value={newStartTimeValue}
            onChange={this.handleUpdateStartTimeValue}
          />
        </TableCell>
        <TableCell>
          <DateTimePicker
            autoOk
            showTodayButton
            allowKeyboardControl
            className={classes.dateTimePicker}
            value={newEndTimeValue}
            onChange={this.handleUpdateEndTimeValue}
          />
        </TableCell>
        <TableCell>
          {displayTime(newEndTimeValue - newStartTimeValue)}
        </TableCell>
        <TableCell>
          <Button onClick={() => {toggleAlert(eventKey)}} style={{color: "red"}}>
            Delete Event
          </Button>
        </TableCell>
      </TableRow>
    )
  }
}

Event.propTypes = {
  eventKey: PropTypes.string.isRequired,
  eventData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  toggleAlert: PropTypes.func.isRequired
}

export default withStyles(styles)(Event)