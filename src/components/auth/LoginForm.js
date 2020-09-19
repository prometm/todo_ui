import React from 'react'
// import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

// import "core-js/stable";
// import "regenerator-runtime/runtime";

// import "@babel/polyfill";

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
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // https://www.youtube.com/watch?v=AWLgf_xfd_w&list=PLgYiyoyNPrv_yNp5Pzsx0A3gQ8-tfg66j&index=6

  handleSubmit(e) {
    e.preventDefault()
    axios.post(this.props.hostName + '/auth/sign_in', {
      'email': this.state.email,
      'password': this.state.password,
      'crossDomain': true
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
          <input style={styles.inputData} type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
          <input style={styles.inputData} type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
          <button>Войти</button>
          <Link to="/register">Регистрация</Link>
          
        </form>
      </div>
    )
  }
}

export default LoginForm