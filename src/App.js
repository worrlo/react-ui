import React, { useEffect, useReducer } from 'react';

const app = {
  abr: "React(HK)",
  name: "React-Hook UI Demo"
};

function App(props) {
  const [state, dispatch] = useReducer((state, action) => {
    let res = {...state, lastAction: action.type};
    switch(action.type) {
      case '#home': 
      case '#signOut': 
          res.isLoggedIn = false;
          res.abr = app.abr;
        break;
      case '#login': 
          res.isLoggedIn = true;
          res.abr = (app.abr + " Admin");
        break;
      case '#docs':
        break;
      default: 
        res.lastAction = "";
      break;
    }
    if (res.lastAction && action.event) {
      action.event.preventDefault();
      console.log("nav-event: ", res.lastAction);
    }
    return res;
  },{
    isLoggedIn: false,
    lastAction: "",
    ...app
  });

  function handler(e) {
    if (e.target.nodeName === "A") {
      dispatch({type: e.target.hash, event: e});
    }
  } 

  //Render Icon(s)
  useEffect(() => {
    window.feather.replace();
  });

  useEffect(() => {
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  });

  return (
    <React.Fragment>
      <AppNav {...state}>
        {state.isLoggedIn ? <AppSignOut /> : ""}
      </AppNav>
      <main role="main">
        {state.isLoggedIn
          ? "<AppContent />"
          : <WelcomePage  {...state} />
        }
      </main>
    </React.Fragment>
  );
}

function AppNav(props) {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a href="http://www.google.com#home" 
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        >{props.abr}</a>
      {props.children}
    </nav>
  );
}

function AppSignOut(props) {
  return (
    <ul className="navbar-nav px-3">
      <li className="nav-item text-nowrap">
        <a href="#signOut" className="nav-link">
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
            <a href="#login" role="button" className="btn btn-secondary" >Launch</a>
          </p>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default App;