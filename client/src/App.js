import React from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/create" exact component={CreatePost} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;