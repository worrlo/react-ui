import React, { useEffect, useReducer } from 'react';

const appName = "React(HK)"
function App(props) {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'LOGOUT': return {
        ...state,
        isLoggedIn: false,
        abr: appName
      }
      case 'LOGIN': return {
        ...state,
        isLoggedIn: true,
        abr: (appName + " Admin")
      }
      default: return state;
    }
  },{
    isLoggedIn: false,
    abr: appName,
    name: "React-Hook UI Demo"
  });

  useEffect(() => {
    window.feather.replace();
  });

  return (
    <React.Fragment>
      <AppNav dispatch={dispatch} {...state}>
        {state.isLoggedIn ? <AppSignOut dispatch={dispatch} /> : ""}
      </AppNav>
      <main role="main">
        {state.isLoggedIn
          ? "<AppContent />"
          : <WelcomePage dispatch={dispatch}  {...state} />
        }
      </main>
    </React.Fragment>
  );
}

function AppNav(props) {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a href="#home" 
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        onClick={() => props.dispatch({type: props.isLoggedIn ? "LOGOUT" : "LOGIN"})}
        >{props.abr}</a>
      {props.children}
    </nav>
  );
}

function AppSignOut(props) {
  return (
    <ul className="navbar-nav px-3">
      <li className="nav-item text-nowrap">
        <a href="#signOut" className="nav-link" onClick={() => props.dispatch({type:"LOGOUT"})}>
            Sign Out <span data-feather="log-out"></span>
        </a>
      </li>
    </ul>
  );
}

function AppFooter(props) {
  return (
    <footer>
      <hr/>
      <p>
        Powered By: <span title="Bourbon &amp; Bad Choices">React &amp; Bootstrap</span>
      </p>
    </footer>
  );
}

function WelcomePage(props) {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-3">
          {props.name}
          <small>{props.abr}</small>
        </h1>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h2>Documentation</h2>
          <p>
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. 
          </p>
          <p>
            <a href="#docs" role="button" className="btn btn-secondary">Open Library</a>
          </p>
        </div>
        <div className="col-md-6">
          <h2>Admin Console</h2>
          <p>
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. 
          </p>
          <p>
            <a href="#login" role="button" className="btn btn-secondary" onClick={() => props.dispatch({type:"LOGIN"})}>Launch</a>
          </p>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default App;