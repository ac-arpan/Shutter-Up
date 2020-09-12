import React, { useEffect, useContext } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { UserProvider } from './context/GlobalState'
import { userContext } from './context/GlobalState'

import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';

import M from "materialize-css";


const Routing = () => {

  const { dispatch } = useContext(userContext)
  const history = useHistory()

  useEffect( () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user) {
      dispatch({
        type: 'USER',
        payload: user
      })
      history.push('/')
    } else {
      console.log("Please Login..................!")
      let signInModal = document.querySelector('#modal-login')
      M.Modal.getInstance(signInModal).open()
    }
  }, [])

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/create" exact component={CreatePost} />
    </Switch>
  )
}

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Navbar />
          <Routing />
        </div>
      </UserProvider>
    </Router >
  );
}

export default App;
