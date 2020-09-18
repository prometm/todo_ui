import React, { Fragment } from 'react'
import axios from 'axios'

const styles = {
  addProjectContainer: {
    width: '100%'
  }
}

class AddProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projectName: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:3001/api/v1/projects',
      {data: {
          attributes: {
            name: this.state.projectName
          }
        },
      },
      {
        headers: {
          'access-token': localStorage['accessToken'],
          client: localStorage['client'],
          uid: localStorage['uid']
        },
      },
      { withCredentials: true }
    ).then(resp => {
      this.props.addNewProject(resp.data)
      this.setState({
        projectName: ''
      })
    }).catch(error => {
      console.log('Request error ', error)
    })
  }

  render() {
    return(
      <Fragment>
        <div style={styles.addProjectContainer} id="project_name" method="POST" hidden={this.props.isHidden}>
          <form onSubmit={this.handleSubmit}>
            <input id="new_project_name" className="inputData" value={this.state.projectName} onChange={this.handleChange} type="text" name="projectName"/>
            <button id="new_project" className="addNewProject">Add</button>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default AddProject