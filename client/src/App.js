import React, { useEffect, useContext } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { UserProvider } from './context/GlobalState'
import { userContext } from './context/GlobalState'

import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import CreatePost from './components/CreatePost';
import Index from './components/Index';
import SubscribedPosts from './components/SubscribedPosts';
import UserPostList from './components/UserPostList';
import ResetPassword from './components/ResetPassword';



const Routing = () => {

  const { dispatch } = useContext(userContext)
  const history = useHistory()

  // console.log(history)

  useEffect( () => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(user) {
      dispatch({
        type: 'USER',
        payload: user
      })
      if(history.location.pathname === '/index') {
        history.push('/')
      }
      history.push(history.location.pathname)
    } else {
      if(history.location.pathname.startsWith('resetPassword')) {
        console.log(history.location.pathname)
      }
      else {
        history.push('/index')
      }
    }
  }, [])

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/subscribedPosts" exact component={SubscribedPosts} />
      <Route path="/userPostList/:userId" component={UserPostList} />
      <Route path="/index" exact component={Index} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/profile/:userId"  component={UserProfile} />
      <Route path="/create" exact component={CreatePost} />
      <Route path="/resetPassword" exact component={ResetPassword} />
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
