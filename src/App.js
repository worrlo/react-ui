import React, { Component } from 'react';

if (!window.feather) {
  window.feather = {
    replace: () => console.log("feather unknown")
  };
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      name: "React-UI"
    };
  }

  chooseContainer() {
    return (
      "App container"
      + (this.state.isLoggedIn ? "-fluid" : "")
    );
  }

  login(val) {
    if (val !== undefined) {
      this.setState({isLoggedIn: val});
    }
    else {
      this.setState({isLoggedIn: !this.state.isLoggedIn});
    }
  }

  componentDidMount() {
    window.feather.replace();
  }
  componentDidUpdate() {
    window.feather.replace();
  }

  render() {
    return (
      <div className={this.chooseContainer()}>
        <AppNav app={this} />
      </div>
    );
  }
}

class AppNav extends Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  getName() {
    return (this.app.state.name + (this.app.state.isLoggedIn ? " Admin" : ""));
  }

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a href="#home" className="navbar-brand col-sm-3 col-md-2 mr-0" onClick={() => this.app.login()}>{this.getName()}</a>
        <NavSignOut app={this.app}/>
      </nav>
    );
  }
}

class NavSignOut extends Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return (!this.app.state.isLoggedIn ? "" :
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a href="#signOut" className="nav-link" onClick={() => this.app.login(false)}>
             Sign Out <span data-feather="log-out"></span>
          </a>
        </li>
      </ul>
    );
  }
}

export default App;
