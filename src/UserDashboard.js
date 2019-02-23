import React, { Component } from 'react'
import Task from './Task'
import {Redirect} from 'react-router-dom'
import TimeDisplay from './TimeDisplay'

import {
  Button,
  Input,
  GridList,
  Typography
} from '@material-ui/core'

class UserDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addingTask: false,
      taskName: "",
      taskNameError: ""
    }
  }

  handleAddNewTask = () => {
    this.setState({addingTask: true})
  }

  handleTaskNameChange = (evt) => {
    this.setState({taskName: evt.target.value})
  }

  handleSaveTaskName = async () => {
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
    const { user, userName, userData, logOut, newTaskEvent, deleteTaskType, deleteTaskEvent } = this.props;
    const { addingTask, taskName, taskNameError } = this.state
    if (!user) {
      return <Redirect to={`/`}/>
    }

    const tasks = userData && userData.taskTypes && Object.entries(userData.taskTypes).map(taskType => {
      return <Task key={taskType[0]} taskType={taskType} newTaskEvent={newTaskEvent} deleteTaskType={deleteTaskType} />
    })
    return (
      <div>
        <Typography variant="h1">
          Welcome, {userName}!
        </Typography>
        <Button onClick={logOut}>Log Out</Button>
        <br/>
        <br/>
        <Typography variant="h3">
          Current Tasks
        </Typography>
        <br/>
        <GridList>
          {tasks || <div><h5>No Tasks Found!</h5></div>}
        </GridList>
        <Button type="button" onClick={this.handleAddNewTask}>Add A Task</Button>
        {
          addingTask ?
            <div>
              <Input
                type="text"
                onChange={this.handleTaskNameChange}
                placeholder="New Task Name..."
              />
              <Button
                type="button"
                onClick={this.handleSaveTaskName}
                value={taskName}>
                Save
              </Button>
              <p style={{color: "red"}}>{taskNameError}</p>
            </div>
          :
            <div/>
        }
        <br/>
        <br/>
        <Typography variant="h3">
          Metrics
        </Typography>
        <br/>
        <div>
          {userData && userData.taskEvents ? <TimeDisplay userData={userData} deleteTaskEvent={deleteTaskEvent}/> : <div><h5>No Events Found!</h5></div>}
        </div>
      </div>
    )
  }
}
export default UserDashboard