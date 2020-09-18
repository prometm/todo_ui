import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './components/auth/LoginForm.js'
import RegisterForm from './components/auth/RegisterForm.js'
import Projects from './components/Projects.js'
import ProtectedComponent from './components/ProtectedComponent.js'

// class A extends React.Component 

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hostName: "https://maks-api-todo.herokuapp.com/"
    }
  }
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} render={props => (
              <LoginForm {...props} hostName={this.state.hostName} />
              )
            } />
            <Route exact path={"/register"} render={props => (
              <RegisterForm {...props} hostName={this.state.hostName} />
              )
            } />
            <ProtectedComponent
              exact
              path="/projects"
              component={Projects}
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
