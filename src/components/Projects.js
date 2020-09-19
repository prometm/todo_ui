import React, { Fragment } from 'react'
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
import axios from 'axios'

import AddProject from './AddProject.js'
import Project from './Project.js'


const styles = {
  mainTasksContainer: {
    width: '60%',
    marginLeft: '20%',
  },
  addProjectContainer: {
    width: '100%'
  },
  cont: {
    background: '#ff0000',
    width: 100,
    height: 50,
    margin: '10% 0 10% 0',
  },
  addNewProject: {}
}

class Projects extends React.Component {
  constructor(props) {
    super(props)

    // console.log('-> ', this.props)

    this.state = {
      projects: [],
      projectFormHiddem: true,
      hostName: "https://maks-api-todo.herokuapp.com/",
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.showTodoForm = this.showTodoForm.bind(this)
    this.addNewProject = this.addNewProject.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
    this.getProjects = this.getProjects.bind(this)
    this.updatePage = this.updatePage.bind(this)
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects() {
    var path = this.state.hostName + 'api/v1/projects'
    axios.get(path, {
      headers: {
        'access-token': localStorage['accessToken'],
        client: localStorage['client'],
        uid: localStorage['uid']
      }
    },
    { withCredentials: true }
    ).then(resp => {
      this.setState({
        projects: resp.data,
      })
      // console.log(this.state.projects)
    }
    ).catch(error => {
      console.log('Request error ', error)
    })
  }

  handleLogout(e) {
    e.preventDefault()
    axios.delete(this.state.hostName + 'auth/sign_out', {
      headers: {
        'access-token': localStorage['accessToken'],
        client: localStorage['client'],
        uid: localStorage['uid']
      }
    },
    { withCredentials: true }
    ).then(resp => {
      localStorage['isLogged'] = ''
      localStorage['accessToken'] = ''
      localStorage['client'] = ''
      localStorage['uid'] = ''
      this.props.history.push('/')
    }).catch(error => {
      console.log('Request error ', error)
    })
  }

  showTodoForm(e) {
    e.preventDefault()
    this.setState({
      projectFormHiddem: !this.state.projectFormHiddem
    })

  }

  addNewProject(newProject) {
    var p = this.state.projects
    p.push(newProject)
    this.setState({
      projects: p,
      projectFormHiddem: !this.state.projectFormHiddem
    })
    // console.log(this.state.projects)
  }

  deleteProject(projectId) {
    axios.delete(this.state.hostName + 'api/v1/projects/' + projectId, {
      headers: {
        'access-token': localStorage['accessToken'],
        client: localStorage['client'],
        uid: localStorage['uid']
      }
    },
    { withCredentials: true }
    ).then(resp => {
      this.getProjects()
      // console.log(resp)
    }
    ).catch(error => {
      console.log('Request error ', error)
    })
  }

  updatePage(e) {
    this.getProjects()
  }

  render() {
    return(
      <Fragment>
        <div id="mainTasksContainer" style={styles.mainTasksContainer}>

          {this.state.projects.map(item => (
            <Project project={item} updatePage={this.updatePage} tasks={item.tasks} hostName={this.state.hostName} key={'project-' + item.id} handleDelete={this.deleteProject} />
          ))}

        </div>
        
        <div className="addContainer">
            <div id="add_button">
                <p><input onClick={this.showTodoForm} style={styles.addNewProject} type="submit" value="+ Add TODO list" id="add_project"/></p>
                <AddProject addNewProject={this.addNewProject} hostName={this.state.hostName} isHidden={this.state.projectFormHiddem} />
            </div>
        </div>
        <input id="logout" onClick={this.handleLogout} type="submit" value="Logout" />
      </Fragment>
    )
  }
}

export default Projects