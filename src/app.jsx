import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <h1>Home</h1>;
  }
}

class User extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <h1>User</h1>;
  }
}

class UserHh extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <h1>UserHHHHH</h1>;
  }
}
class App extends Component {
  constructor() { // Component should be written as a pure functioneslint(react/prefer-stateless-function)
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user" exact component={User} />
          <Route path="/user/hh" component={UserHh} />
        </Switch>
      </Router>
    );
  }
}

export default App;
