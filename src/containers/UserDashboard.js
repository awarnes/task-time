import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import {
  Button,
  GridList,
  Typography,
  withStyles,
  TextField,
  Card
} from '@material-ui/core'
import Task from '../components/Task'
import DashboardReport from './DashboardReport';

const styles = {
  gridList: {
    padding: "5px"
  },
  addTaskPaper: {
    padding: "5px",
    margin: "3px",
    maxWidth: 180,
    display: "flex",
    flexFlow: "row no-wrap",
    justifyContent: "center", 
  }
}

class UserDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addingTask: false,
      taskName: "",
      taskNameError: ""
    }
  }

  toggleAddNewTask = () => {
    this.setState({addingTask: !this.state.addingTask})
  }

  handleTaskNameChange = (evt) => {
    this.setState({
      taskName: evt.target.value,
      taskNameError: ""
    })
  }

  handleSaveTaskName = async (event) => {
    event.preventDefault()
    if (await this.props.addTaskType(this.state.taskName)) {
      this.setState({
        addingTask: false,
        taskName: "",
        taskNameError: ""
      })
    } else {
      this.setState({
        taskNameError: "That task already exists!"
      })
    }
  }

  render () {
    const { user, userData, addTaskEvent, deleteTaskType, classes } = this.props;
    const { addingTask, taskNameError } = this.state
    if (!user) return <Redirect to={`/`}/>;

    const tasks = userData && userData.taskTypes && Object.entries(userData.taskTypes).map(taskType => {
      return <Task key={taskType[0]} taskType={taskType} addTaskEvent={addTaskEvent} deleteTaskType={deleteTaskType} />
    })
    
    return (
      <div>
        {tasks ?
          <GridList className={classes.gridList}>
            {tasks}
          </GridList>
        :
          <Typography variant="h5" component="h2">
            No Tasks Found, Add A Task With The Button Below!
          </Typography>
        }
        <Button onClick={this.toggleAddNewTask}>
          Add A Task
        </Button>
        {
          addingTask ?
            <Card className={classes.addTaskPaper}>
              <form onSubmit={this.handleSaveTaskName}>
                <div>
                  <TextField
                    id="taskNameField"
                    required
                    label="Task Name"
                    onChange={this.handleTaskNameChange}
                    placeholder="New Task Name..."
                    helperText={taskNameError}
                    FormHelperTextProps={{error: true}}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Button type="submit">
                    Save
                  </Button>
                  <Button onClick={this.toggleAddNewTask}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          :
            <div/>
        }
        <DashboardReport userData={userData} />
      </div>
    )
  }
}

UserDashboard.propTypes = {
  user: PropTypes.object,
  userData: PropTypes.object,
  addTaskType: PropTypes.func,
  deleteTaskType: PropTypes.func,
  addTaskEvent: PropTypes.func,
  deleteTaskEvent: PropTypes.func,
  classes: PropTypes.object
}

export default withStyles(styles)(UserDashboard)