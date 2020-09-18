// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
// import PropTypes from 'prop-types'
// import axios from 'axios'
import EnterView from './EnterView.js'
import LoginForm from './LoginForm.js'
import RegisterForm from './RegisterForm.js'
import Projects from './Projects.js'

const axios = require('axios')

const styles = {
  loginContainer: {
    width: '20%',
    marginTop: '15%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 20,
    textAlign: 'center'
  }
}

const App = props => (
  <Router>
    
      <div style={styles.loginContainer}>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/auth/sign_in" component={LoginForm} />
        <Route exact path="/auth/sign_up" component={RegisterForm} />
      </div>
      <Route exact path="/api/v1/projects" component={Projects} />
    
  </Router>
)

App.defaultProps = {
  name: 'David'
}

// App.propTypes = {
//   name: PropTypes.string
// }

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App name="React App" />,
    document.body.appendChild(document.createElement('div')),
  )
})
