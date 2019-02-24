import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';
import {
  Paper,
  withStyles,
  TextField
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

class BasicChart extends Component {
  state = {
    taskTypes: [],
    taskEvents: []
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
    console.error("XKCD: ", taskEvents)
    this.setState({ taskEvents })
  }

  render() {
    const { userData, classes } = this.props
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: `Time by ${"bucketSelection.name"}`,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 0, 56, 55, 40]
        }
      ]
    };
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
            className={classes.datePicker}
          />
          <TextField
            id="endDate"
            label="End Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.datePicker}
          />
        </div>
        <Bar
          data={data}
        />
      </Paper>
    )
  }
}

export default withStyles(styles)(BasicChart)