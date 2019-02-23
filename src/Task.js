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

class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: false,
      startTime: null,
      endTime: null,
      runningTime: 0,
      timeZone: "America/Los_Angeles",
      type: this.props.taskType[1] || "unregistered"
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
        this.props.newTaskEvent(this.state)
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

  render () {
    const { taskType, deleteTaskType } = this.props;
    const { startTime, status } = this.state;
    
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
              onClick={() => { deleteTaskType(taskType[0]) }}
              style={{color: "red"}}
            >Delete Task</Button>
          </CardActions>
        </Card>
      </GridListTile>
    )
  }
}

export default Task;