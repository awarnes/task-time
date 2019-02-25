import React, { Component } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  withStyles,
  Button
} from '@material-ui/core'

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import { displayTime } from './Utilities'

const styles = {
  root: {
    width: "100%"
  }
}

const compareTaskTotalTimes = (asc) => (task1, task2) => {
  let high, low
  if (asc) {
    high = 1
    low = -1
  } else {
    high = -1
    low = 1
  }

  if (task1[1] > task2[1]) return high;
  if (task1[1] < task2[1]) return low;
  return 0
}

class EventTotalsDisplay extends Component {
  state = {
    ascending: true
  }
  render() {
    const { userData, classes } = this.props
    const { ascending } = this.state

    const timeByTask = Object.entries(Object.keys(userData.taskEvents).reduce((total, eventKey) => {
      let eventData = userData.taskEvents[eventKey]
      if (total[eventData.type]) {
        total[eventData.type] += eventData.endTime - eventData.startTime
      } else {
        total[eventData.type] = eventData.endTime - eventData.startTime
      }
      return total
    }, [])).sort(compareTaskTotalTimes(ascending)).map(task => {
      return (
        <TableRow key={`${task[0]}-totals`}>
          <TableCell>{task[0]}</TableCell>
          <TableCell>{displayTime(task[1])}</TableCell>
        </TableRow>
      )
    })
    // onClick={() => {this.setState({ascending: !ascending})}}
    return (
      <div className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
              <Button onClick={() => {this.setState({ascending: !ascending})}}>
                  Task
                  {ascending ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => {this.setState({ascending: !ascending})}}>
                  Total Time
                  {ascending ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </Button>
              </TableCell>
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