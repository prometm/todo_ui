import React from 'react'
// import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
import axios from 'axios'

const styles = {
  loginContainer: {
    width: '20%',
    marginTop: '15%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 20,
    textAlign: 'center'
  },
  cont: {
    margin: '10% 0 10% 0',
  },
  inputData: {
    background: '#f1ebdc',
    width: '100%',
    height: 35,
    border: 'none',
    borderRadius: 5,
    fontSize: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  }
}

class RegisterForm extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    var path = this.props.hostName + 'auth'
    axios.post(path, {
      'email': this.state.email,
      'password': this.state.password,
      'password_confirmation': this.state.password_confirmation
    },
    { withCredentials: true }
    ).then(resp => {
      let accessToken = resp.headers["access-token"]
      let client = resp.headers["client"]
      let uid = resp.headers["uid"]
      
      localStorage['accessToken'] = accessToken
      localStorage['client'] = client
      localStorage['uid'] = uid
      
      localStorage['isLogged'] = 'IS_LOGGED'
      this.props.history.push('/projects')

    }).catch(error => {
      console.log('Request error ', error)
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return(
      <div style={styles.loginContainer}>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="email" style={styles.inputData} placeholder="Email"  value={this.state.email} onChange={this.handleChange} required />
          <input type="text" name="password" style={styles.inputData} placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
          <input type="text" name="password_confirmation" style={styles.inputData} placeholder="Confirm password" value={this.state.password_confirmation} onChange={this.handleChange} required />
          <button>Зарегистрироваться</button>
          <Link to="/">Вход</Link>
        </form>
      </div>
    )
  }
}

export default RegisterForm