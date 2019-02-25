/* eslint no-unused-vars: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2';
import {
  Paper,
  withStyles,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel
} from '@material-ui/core'
import moment from 'moment-timezone'

const styles = {
  paper: {
    backgroundColor: "white"
  },
  datePickerContainer: {
    display: "flex",
    justifyContent: "center"
  },
  datePicker: {
    margin: "5px",
    padding: "5px",
  }
}

const timeBucketFilterArray = ["Day", "Week", "Month", "Year"]

class BasicChart extends Component {
  state = {
    taskTypes: [],
    taskEvents: [],
    activeTaskTypes: [],
    filterByTaskTypes: true,
    activeBucketFilter: "Week",
    startTimeInterval: moment().startOf("day").valueOf(),
    endTimeInterval: moment().endOf("day").valueOf()
  }

  componentDidMount () {
    this.setTaskTypes()
    this.setTaskEvents()
  }

  setTaskTypes = () => {
    const { userData } = this.props
    const taskTypes = Object.values(userData.taskTypes)
    this.setState({ taskTypes }) 
  }

  setTaskEvents = () => {
    const { userData } = this.props
    const taskEvents = Object.values(userData.taskEvents)
    this.setState({ taskEvents })
  }

  updateActiveTaskTypes = (taskType) => {
    const { activeTaskTypes } = this.state
    if (activeTaskTypes.includes(taskType)) {
      const newActiveTaskTypes = activeTaskTypes.filter(type => type !== taskType)
      this.setState({activeTaskTypes: newActiveTaskTypes})
    } else {
      const newActiveTaskTypes = activeTaskTypes.concat(taskType)
      this.setState({activeTaskTypes: newActiveTaskTypes})
    }
  }

  updateActiveBucketFilter = (bucket) => {
    this.setState({
      activeBucketFilter: bucket,
      filterByTaskTypes: false
    })
  }

  handleTimeIntervalChange = (name, evt) => {
    let time
    if (name === "startTimeInterval") {
      time = moment(evt.target.value).startOf("day").valueOf()
    } else {
      time = moment(evt.target.value).endOf("day").valueOf()
    }
    this.setState({[name]: time })
  }

  render() {
    const { classes } = this.props
    const {
      taskTypes,
      taskEvents: eventsForTasks,
      activeTaskTypes,
      activeBucketFilter,
      filterByTaskTypes,
      startTimeInterval,
      endTimeInterval
    } = this.state

    let taskEvents = eventsForTasks;

    if (startTimeInterval && endTimeInterval) {
      taskEvents = eventsForTasks.filter(event => (event.startTime >= startTimeInterval) && (event.startTime <= endTimeInterval))
    }

    const activeEventTotals = taskEvents.reduce((total, event) => {
      if (!activeTaskTypes.includes(event.type)) return total;
      if (total[event.type]) {
        total[event.type] += event.endTime - event.startTime
      } else {
        total[event.type] = event.endTime - event.startTime
      }
      return total
    }, [])
    
    const displayData = activeTaskTypes.map(type => activeEventTotals[type] / 60000)

    const data = {
      labels: filterByTaskTypes ? activeTaskTypes : [],
      datasets: [
        {
          label: `Filtered by ${filterByTaskTypes ? "Task Types (Minutes)" : activeBucketFilter}`,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: displayData || []
        }
      ]
    };

    const taskFilters = taskTypes.map(taskType => {
      return (
        <Button
          key={`${taskType}-filterButton`}
          onClick={() => { this.updateActiveTaskTypes(taskType) }}
          variant="contained"
          color={activeTaskTypes.includes(taskType) ? "primary" : "default"}>
          {taskType}
        </Button>
      )
    })

    const timeBucketFilters = timeBucketFilterArray.map(bucketType => {
      return (
        <Button
          key={`${bucketType}-button`}
          onClick={() => { this.updateActiveBucketFilter(bucketType) }}
          variant="contained"
          color={(bucketType === activeBucketFilter) && !filterByTaskTypes ? "primary" : "default"}> 
          {bucketType}
        </Button>
      )
    })

    return (
      <Paper className={classes.paper}>
        <div className={classes.datePickerContainer}>
          <TextField
            id="startDate"
            label="Start Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            error={endTimeInterval < startTimeInterval}
            className={classes.datePicker}
            value={moment(startTimeInterval).format("YYYY-MM-DD") || ""}
            onChange={(evt) => {this.handleTimeIntervalChange("startTimeInterval", evt)}}
          />
          <TextField
            id="endDate"
            label="End Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            error={endTimeInterval < startTimeInterval}
            className={classes.datePicker}
            value={moment(endTimeInterval).format("YYYY-MM-DD") || ""}
            onChange={(evt) => {this.handleTimeIntervalChange("endTimeInterval", evt)}}
          />
        </div>
        <Divider />
        <Bar
          data={data}
        />
        <Divider />
        <div className={classes.filterContainer}>
          <div>
            {/* <FormControlLabel
              control={<Switch
                onChange={() => { this.setState({filterByTaskTypes: !filterByTaskTypes})}}
                checked={filterByTaskTypes}
                value={filterByTaskTypes}
              />}
            label="Filter by Task Type"
            />
            <br /> */}
            { taskFilters }
          </div>
          {/* <Divider />
          <div>
            { timeBucketFilters }
          </div> */}
        </div>
      </Paper>
    )
  }
}

BasicChart.propTypes = {
  userData: PropTypes.object,
  classes: PropTypes.object
}

export default withStyles(styles)(BasicChart)