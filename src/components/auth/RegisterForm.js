import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
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
      password_confirmation: '',
      emailError: '',
      passwordError: '',
      password_confirmationError: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  validate = () => {
    let emailError = ''
    let passwordError = ''
    let password_confirmationError = ''

    if(!this.state.email.includes('@')) {  
      emailError = 'Invalid email'
    }
    if(this.state.password.length < 8) {
      passwordError = 'The password cannot be less than 8 characters'
    }
    if (this.state.password !== this.state.password_confirmation) {
      password_confirmationError = 'Password mismatch'
    }
    
    if (emailError || passwordError || password_confirmationError) {
      this.setState({ emailError, passwordError, password_confirmationError })
      return false
    } else {
      this.setState({
        emailError: '',
        passwordError: '',
        password_confirmationError: ''
      })
    }

    return true
  }

  handleSubmit(e) {
    e.preventDefault()
    const isValid = this.validate()

    if (isValid) {
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
          <div style={{color: 'red'}}>{this.state.emailError}</div>
          <input type="password" name="password" style={styles.inputData} placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
          <div style={{color: 'red'}}>{this.state.passwordError}</div>
          <input type="password" name="password_confirmation" style={styles.inputData} placeholder="Confirm password" value={this.state.password_confirmation} onChange={this.handleChange} required />
          <div style={{color: 'red'}}>{this.state.password_confirmationError}</div>
          <button>Sign Up</button>
          <Link to="/">Sign In</Link>
        </form>
      </div>
    )
  }
}

RegisterForm.propTypes = {
  hostName: PropTypes.string.isRequired
}

export default RegisterForm