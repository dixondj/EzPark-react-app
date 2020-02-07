import React from 'react';
import './App.css';
import {Route, Switch } from 'react-router-dom'

import FirstPageButton from './pages/FirstPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'>
            <FirstPageButton/>
       </Route>
       <Route exact path='/login'>
            <LoginPage/>
       </Route>
       <Route exact path='/signup'>
            <SignupPage/>
       </Route>
       <Route exact path='/home'>
            <HomePage />
       </Route>
      </Switch>
    </>
  )
}

export default App;
