import React, { Component } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  withStyles
} from '@material-ui/core'

import { displayTime } from './Utilities'

const styles = {
  root: {
    width: "100%"
  }
}

class EventTotalsDisplay extends Component {
  render() {
    const { userData, classes } = this.props

    const timeByTask = Object.entries(Object.keys(userData.taskEvents).reduce((total, eventKey) => {
      let eventData = userData.taskEvents[eventKey]
      if (total[eventData.type]) {
        total[eventData.type] += (eventData.endTime - eventData.startTime)
      } else {
        total[eventData.type] = eventData.runningTime
      }
      return total
    }, [])).map(task => {
      return (
        <TableRow key={`${task[0]}-totals`}>
          <TableCell>{task[0]}</TableCell>
          <TableCell>{displayTime(task[1])}</TableCell>
        </TableRow>
      )
    })

    return (
      <div className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Total Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeByTask}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default withStyles(styles)(EventTotalsDisplay)