import React,{Component} from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom'; 
class Home extends Component {
  render() {
    return <h1>Home</h1>
  }
}
class User extends Component {
  render() {
    return <h1>User</h1>
  }
}
class UserHh extends Component {
  render() {
    return <h1>UserHh</h1>
  }
}
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/user"   component={User}></Route>
          <Route path="/user/hh"  component={UserHh}></Route>
        </Switch>
      </Router>
    )
  }
}
export default App;
