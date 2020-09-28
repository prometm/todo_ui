import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const axios = require('axios')

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

class LoginForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      invalidAuthData: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  validate = () => {
    let emailError = ''
    let passwordError = ''
  
    if(!this.state.email.includes('@')) {  
      emailError = 'Invalid email'
    }
    if(this.state.password.length < 8) {
      passwordError = 'The password cannot be less than 8 characters'
    }
    
    if (emailError || passwordError) {
      this.setState({ emailError, passwordError })
      return false
    } else {
      this.setState({
        emailError: '',
        passwordError: ''
      })
    }
    return true
  }

  handleSubmit(e) {
    e.preventDefault()
    const isValid = this.validate()

    if (isValid) {
      axios.post(this.props.hostName + 'auth/sign_in', {
        'email': this.state.email,
        'password': this.state.password,
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
        this.setState({passwordError: 'Invalid email or/and password'})
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
          <input style={styles.inputData} type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
          <div style={{color: 'red'}}>{this.state.emailError}</div>
          <input style={styles.inputData} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
          <div style={{color: 'red'}}>{this.state.passwordError}</div>
          <div>{this.state.invalidAuthData}</div>
          <button>Sign In</button>
          <Link to="/register">Sign Up</Link>
          
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  hostName: PropTypes.string.isRequired
}

export default LoginForm