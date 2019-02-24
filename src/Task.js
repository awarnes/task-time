import React, { Component } from 'react'
import moment from 'moment'
import countdown from 'countdown'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  GridListTile
} from '@material-ui/core'

import Alert from './Alert'

class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: false,
      startTime: null,
      endTime: null,
      runningTime: 0,
      timeZone: "America/Los_Angeles",
      type: this.props.taskType[1] || "unregistered",
      alertOpen: false,
      currentTask: ""
    }
  }

  componentWillMount() {
    countdown.setLabels(
      ' | | | | | |',
      ' | | | | | |',
      ' : ',
      ', ',
      '0');
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  toggleTask = () => {
    const { status } = this.state
    
    if (status) {
      clearInterval(this.timer);
      this.setState({
          endTime: moment.now(),
          status: !status
        },
      () => {
        this.props.addTaskEvent(this.state)
      })
    } else {
      const startTime = moment.now();
      this.timer = setInterval(() => {
        this.setState({ runningTime: moment.now() - startTime })
      });
      this.setState({
        status: !status,
        startTime: startTime
      });
    }    
  };

  toggleAlert = (taskType) => {
    if (!this.state.alertOpen) {
      this.setState({
        currentTask: taskType,
        alertOpen: true
      })
    } else {
      this.setState({alertOpen: false})
    }
  }

  render () {
    const { taskType, deleteTaskType } = this.props;
    const { startTime, status, alertOpen } = this.state;
    
    return (
      <GridListTile>
        <Card style={{maxWidth: 250, textAlign: "center"}}>
          <CardContent>
            <Typography style={{fontSize: 14}} color="textSecondary" gutterBottom>
              {taskType[1]}
            </Typography>
            <Typography variant="h5" component="h2">
              {status ? countdown(startTime).toString() : "0"}
            </Typography>
          </CardContent>
          <CardActions style={{justifyContent: "center"}}>
            <Button
              type="button"
              onClick={this.toggleTask}
            >{status ? "Stop" : "Start"}</Button>
            <Button
              size="small"
              onClick={() => { this.toggleAlert(taskType[0]) }}
              style={{color: "red"}}
            >Delete Task</Button>
          </CardActions>
        </Card>
        <Alert
          deleteContext={{
            type: "Task",
            text: "delete this task"
          }}
          alertOpen={alertOpen}
          handleCancel={this.toggleAlert}
          handleAccept={() => {
            deleteTaskType(this.state.currentTask)
            this.toggleAlert()
          }}
        />
      </GridListTile>
    )
  }
}

export default Task;