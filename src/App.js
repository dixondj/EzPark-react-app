import React from 'react';
import './App.css';
import {Route, Switch } from 'react-router-dom'

import FirstPageButton from './pages/FirstPage';
import Loader from './pages/LoaderPager';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';

function App() {
  return (
    <>
      <Switch>
        {/* <div>
          <Loader/>
        </div> */}
        <Route exact path='/'>
            <FirstPageButton/>
       </Route>
       <Route exact path='/login'>
            <LoginPage/>
       </Route>
       <Route exact path='/signup'>
            <SignupPage/>
       </Route>
      </Switch>
    </>
  )
}

export default App;
