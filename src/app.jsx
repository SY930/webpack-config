import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

class Home extends Component {
  // constructor() {
  //   super();
  //   this.state = {};
  // }

  // componentDidMount() {
  //   // const ary = [1, 2, 3];
  //   // _.map(ary, (item) => {
  //   //   console.log('item', item);
  //   // });
  //   // console.log('$', $('#root'));
  // }

  // render() {
  //   return <h1>Home</h1>;
  // }
  constructor(props) {
    super(props);
    this.state = {
      list: [{ id: 1, val: 'aa' }, { id: 2, val: 'bb' }, { id: 3, val: 'cc' }],
    };
  }

  click1 = () => {
    const { list } = this.state;
    list.reverse();
    this.setState({});
  }

  splice = () => {
    const { list } = this.state;
    list.splice(1, 1);
    this.setState({});
  }

  render() {
    /**
     *  当我们传入index作为key时，此时的key为0，1，2，
        当我们点击reverse重新排序后，index传进去的key还是0，1，2，此时react比较key=0时，发现只需要更新子节点的值就可以，于是只把item替换成了cc，而input则相反，
        当我们传入id作为index的时候，，点击reverse后，此时的key变成了3，2，1，根据react的diff算法，react还是能分辨出只需要移动子节点即可完成更新，因此input也随之变化。
     */
    const { list } = this.state;
    return (
      <ul>
        <div onClick={this.splice}>delete</div>
        <div onClick={this.click1}>reverse</div>
        {
          list.map((item, index) => (
            <Li key={index} val={item.val} />
          ))
        }
      </ul>
    );
  }
}

class Li extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('===mount===');
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillUpdate() {
    console.log('===update====');
  }

  render() {
    return (
      <li>
        {this.props.val}
        <input type="text"></input>
      </li>
    );
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
          {/* <Route path="/user/hh" component={UserHh} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
