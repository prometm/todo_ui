import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Task from './Task.js'
import Modal from './Modal.js'

import '../css/fontawesome/all.min.css'

const styles = {
  contTbl: {
    margin: '10% 0 10% 0',
  },
  up: {
    background: 'linear-gradient(#4e7dba, #3b639f)',
    color: '#ffffff',
    width: '100%',
    height: 45,
    fontSize: 24,
    fontFamily: 'arial'
  },
  projectName: {
    background: 'linear-gradient(#4a78b5, #426daa)',
    color: '#ffffff',
    width: '85%',
    float: 'left',
    fontSize: 20,
    marginTop: 7,
    marginLeft: 10,
    border: 'none'
  },
  progectAction: {
    marginRight: 17,
    marginTop: 5,
    paddingTop: 7,
    textAlign: 'right',
  },
  editProjectBtn: {
    marginRight: 15,
    marginTop: 12
  },
  delProjectBtn: {},
  createLine: {
    background: 'linear-gradient(#e0e0e0, #cccccc)',
    width: '100%',
    height: 45,
  },
  plus: {
    width: '4%',
    float: 'left',
  },
  fieldContainer: {
    width: '96%',
    height: '80%',
    float: 'left',
    marginTop: 5
  },
  field: {
    background: '#ffffff',
    width: '84%',
    height: 32,
    fontSize: '120%',
    display: 'inline-block',
    border: 'none',
    outline: 'none',
    float: 'left',
  },
  butt: {
    width: '15%',
    height: 43,
    float: 'left'
  },
  btn: {
    width: '100%',
    height: 34,
    background: 'linear-gradient(#8ac0a3, #4b8061)',
    border: 'none',
    fontFamily: 'arial',
    color: '#ffffff',
    fontSize: '100%'
  },
  tbl: {},
  projectActive: {
    color: '#fc3c1a',
  },
}

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: [],
      readOnlyProject: true,
      projectName: this.props.project.name,
      newTaskName: '',
      modalIsVisible: false,
      taskDeadlineId: null,
      deadline: null
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handelNameEdit = this.handelNameEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updatePage = this.updatePage.bind(this)
    this.addTask = this.addTask.bind(this)
    this.handleShowCalendar = this.handleShowCalendar.bind(this)
    this.taskDeadlineId = this.taskDeadlineId.bind(this)
  }

  handleDelete(e) {
    this.props.handleDelete(this.props.project.id)
  }

  handelNameEdit(e) {
    this.setState({
      readOnlyProject: !this.state.readOnlyProject
    })
    if (!this.state.readOnlyProject) {
      axios.patch(this.props.hostName + 'api/v1/projects/' + this.props.project.id,
      {
        data: {
          attributes: {
            name: this.state.projectName
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updatePage(e) {
    this.props.updatePage()
  }

  addTask(e) {
    axios.post(this.props.hostName + 'api/v1/projects/' + this.props.project.id + '/tasks',
    {
      data: {
        attributes: {
          name: this.state.newTaskName
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
      this.setState({
        newTaskName: ''
      })
      this.updatePage()
    }).catch(error => {
      console.log('Request error ', error)
    })
  }

  handleShowCalendar(taskId, deadline) {
    this.setState({
      modalIsVisible: !this.state.modalIsVisible,
      taskDeadlineId: taskId,
      deadline: deadline
    })
  }

  taskDeadlineId(date) {
    axios.patch(this.props.hostName + 'api/v1/projects/' + this.props.project.id + '/tasks/' + this.state.taskDeadlineId + '/deadline',
    {
      data: {
        attributes: {
          deadline: date
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
      this.setState({
        taskDeadlineId: null
      })
      this.handleShowCalendar(null, null)
      this.updatePage()
    }).catch(error => {
      console.log('Request error ', error)
    })
  }

  render() {
    let projectActive = this.state.readOnlyProject ? {} : styles.projectActive
    let projectName = {...styles.projectName, ...projectActive}
    return(
        
      <div style={styles.contTbl} id="project-{{project.id}}">

        <Modal
          modalIsVisible={this.state.modalIsVisible}
          hideModal={this.handleShowCalendar}
          changeTaskDeadline={this.taskDeadlineId}
          deadline={this.state.deadline} />

        <div style={styles.up} >
          <input style={projectName} type="text" name="projectName" onChange={this.handleChange} value={this.state.projectName} readOnly={this.state.readOnlyProject} />
          <div style={styles.progectAction} >
            <div className="navigation">
              <i className="fas fa-pencil-alt" onClick={this.handelNameEdit}></i>
            </div>  
            
            <div className="navigation">
              <i className="fas fa-trash-alt" onClick={this.handleDelete}></i>
            </div>  
          </div>
        </div>
        <div style={styles.createLine}>
          <div style={styles.plus}>
            <p>+</p>
          </div>
            <div style={styles.fieldContainer}>
              <input style={styles.field} type="text" onChange={this.handleChange} name="newTaskName" value={this.state.newTaskName} id="newTaskName{{project.id}}" placeholder="Start typing here to create a task..." />
              <div style={styles.butt}>
                <input style={styles.btn} type="submit" onClick={this.addTask} value="Add Task" name="{{project.id}}" />
              </div>
            </div>
        </div>
        <div style={styles.tbl}>
          <table id="table{this.props.project.id}">
            <tbody>
              {this.props.tasks.map(item => (
                <Task
                  task={item}
                  key={'task-' + item.id}
                  updatePage={this.updatePage}
                  hostName={this.props.hostName}
                  projectId={this.props.project.id}
                  handleShowCalendar={this.handleShowCalendar} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
        
    )
  }
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  updatePage: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  hostName: PropTypes.string.isRequired,
}

export default Project