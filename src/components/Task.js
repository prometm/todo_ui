import React, { Fragment } from 'react'
import axios from 'axios'
import TaskNameField from './TaskNameField.js'


import '../css/fontawesome/all.min.css'

const styles = {
  t: {
    color: '#999999',
    borderBottom: '1px solid #eaedec',
  },
  t1: {
    width: '10%',
    borderRight: '5px double #f0dedd',
  },
  t2: {
    width: '70%',
    textAlign: 'left',
    paddingLeft: '5%'
  },
  t3: {
    width: '20%',
    borderLeft: '1px solid #eaedec'
  },
  navigation: {
    width: '25%',
    float: 'left',
  },
  row: {
    background: '#ffffff',
    width: '100%',
    height: 50,
  },
  rowDone: {
    background: '#c2f7b7',
    width: '100%',
    height: 50,
  },
  upImage: {
    marginTop: '3%',
  },
  downImage: {

  },
}

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskName: this.props.task.name,
      readOnlyName: true,
      taskDone: this.props.task.done
    }

    this.handleTaskDelete = this.handleTaskDelete.bind(this)
    this.handleEditName = this.handleEditName.bind(this)
    this.changeTaskName = this.changeTaskName.bind(this)
    this.taskChecked = this.taskChecked.bind(this)
    this.taskUp = this.taskUp.bind(this)
    this.taskDown = this.taskDown.bind(this)
    this.changeTaskPosition = this.changeTaskPosition.bind(this)
  }

  handleTaskDelete(e) {
    axios.delete(this.props.hostName + 'api/v1/projects/' + this.props.projectId + '/tasks/' + this.props.task.id,
      {
        headers: {
          'access-token': localStorage['accessToken'],
          client: localStorage['client'],
          uid: localStorage['uid']
        }
      },
      { withCredentials: true }
      ).then(resp => {
        this.props.updatePage()
      }).catch(error => {
        console.log('Request error ', error)
      })
  }

  handleEditName(e) {
    this.setState({
      readOnlyName: !this.state.readOnlyName
    })
    if (!this.state.readOnlyName) {
      axios.patch(this.props.hostName + 'api/v1/projects/' + this.props.projectId + '/tasks/' + this.props.task.id,
      {
        data: {
          attributes: {
            name: this.state.taskName
          }
        }
      },
      {
        headers: {
          'access-token': localStorage['accessToken'],
          client: localStorage['client'],
          uid: localStorage['uid']
        }
      },
      { withCredentials: true }
      ).then(resp => {
        
      }).catch(error => {
        console.log('Request error ', error)
      })
    }
  }

  changeTaskName(e) {
    this.setState({
      taskName: e.target.value
    })
  }

  taskChecked(e) {
    this.setState({
      taskDone: !this.state.taskDone
    })
    axios.patch(this.props.hostName + 'api/v1/projects/' + this.props.projectId + '/tasks/' + this.props.task.id + '/complete', 
    {},
    {
      headers: {
        'access-token': localStorage['accessToken'],
        client: localStorage['client'],
        uid: localStorage['uid']
      }
    },
    { withCredentials: true }
    ).then(resp => {
      
    }
    ).catch(error => {
      console.log('Request error ', error)
    })
  }

  changeTaskPosition(newPosition) {
    axios.patch(this.props.hostName + 'api/v1/projects/' + this.props.projectId + '/tasks/' + this.props.task.id + '/position', 
    {
      data: {
        attributes: {
          position: newPosition
        }
      }
    },
    {
      headers: {
        'access-token': localStorage['accessToken'],
        client: localStorage['client'],
        uid: localStorage['uid']
      }
    },
    { withCredentials: true }
    ).then(resp => {
      this.props.updatePage()
    }
    ).catch(error => {
      console.log('Request error ', error)
    })
  }

  taskUp(e) {
    var newPosition = this.props.task.position - 1
    if (newPosition < 1) {
      return
    }
    this.changeTaskPosition(newPosition)
    
  }

  taskDown(e) {
    var newPosition = this.props.task.position + 1
    this.changeTaskPosition(newPosition)
  }

  render() {
    var className = this.state.taskDone ? 'taskNameFieldDone' : 'taskNameField'
    var rowStyle = this.state.taskDone ? 'rowDone' : 'row'
    return(
      <Fragment>
        
        <tr className={rowStyle}>
          <th style={styles.t, styles.t1}>
            <input type="checkbox" onClick={this.taskChecked} className="checkbox" defaultChecked={this.props.task.done} name={this.props.task.name} />
          </th>
          <th style={styles.t, styles.t2}>
            <TaskNameField className={className} name={this.state.taskName} changeTaskName={this.changeTaskName} readOnly={this.state.readOnlyName} />
            
          </th>
          <th style={styles.t, styles.t3}>
            <div style={styles.navigation}>
              <div style={styles.upImage} onClick={this.taskUp} name={this.props.task.id}><i className="fas fa-sort-up"></i></div>
              <div className="downImage" onClick={this.taskDown} name={this.props.task.id}><i className="fas fa-sort-down"></i> </div>
            </div>
            <div style={styles.navigation}>
              <i className="fas fa-pencil-alt" onClick={this.handleEditName}></i>
            </div>

            <div style={styles.navigation}>
              <i style={ this.props.task.deadline ? {color: '#43d45f'} : {color: '#000000'}}
                className="fas fa-calendar-alt"
                onClick={() => this.props.handleShowCalendar(this.props.task.id)}></i>
            </div>
            
            <div style={styles.navigation} onClick={this.handleTaskDelete}>
              <i className="fas fa-trash-alt"></i>
            </div>
          </th>
        </tr>
      </Fragment>
    )
  }
}

export default Task