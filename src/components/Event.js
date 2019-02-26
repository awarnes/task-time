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
      newStartTimeValue: moment(eventData.startTime).tz("America/Los_Angeles"),
      newEndTimeValue: moment(eventData.endTime).tz("America/Los_Angeles"),
      newTypeValue: eventData.type
    }
  }
  

  handleUpdateTypeValue = (evt) => {
    this.setState({newTypeValue: evt.target.value}, () => {
      this.props.updateTaskEvent(this.props.eventKey, this.state)
    })
  }

  handleUpdateStartTimeValue = (newValue) => {
    this.setState({newStartTimeValue: newValue}, () => {
      this.props.updateTaskEvent(this.props.eventKey, this.state)
    })
  }

  handleUpdateEndTimeValue = (newValue) => {
    this.setState({newEndTimeValue: newValue}, () => {
      this.props.updateTaskEvent(this.props.eventKey, this.state)
    })
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
        { newStartTimeValue && newEndTimeValue ?
        <TableCell>
          {displayTime(newEndTimeValue.valueOf() - newStartTimeValue.valueOf())}
        </TableCell>
        :
        <TableCell>
          Please add some times!
        </TableCell>
        }
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
  eventKey: PropTypes.string,
  eventData: PropTypes.object,
  classes: PropTypes.object,
  toggleAlert: PropTypes.func,
  updateTaskEvent: PropTypes.func
}

export default withStyles(styles)(Event)