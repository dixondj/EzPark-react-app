import React from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { AnimatedSwitch } from "./AnimatedSwitch";

import FirstPageButton from './pages/FirstPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import FindMyCarPage from './pages/FindMyCarPage';
import SettingPage from './pages/Setting';

import Navbar from './components/navbar';


const routes = [
     {
          component: FirstPageButton,
          path: "/"
     },

     {
          component: LoginPage,
          path: "/login"
     },

     {
          component: SignupPage,
          path: "/signup"
     },

     {
          component: HomePage,
          path: "/home"
     },

     {
          component: HistoryPage,
          path: "/history"
     },

     {
          component: FindMyCarPage,
          path: "/findmycar"
     },

     {
          component: SettingPage,
          path: "/setting"
     }
]

const pathsWithoutNav = [
     '/login',
     '/signup',
     '/'
]

const Content = styled.div`
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: ${props => props.isFullScreen ? '0' : '55px'};
     overflow-y: scroll;
`


const App = withRouter(({ location }) => {
     const isFullScreen =  pathsWithoutNav.some(path => location.pathname === path)
     return (
          <>
               {
                 isFullScreen  ? '' : <Navbar />
               }
               <Content isFullScreen={isFullScreen}>
                    <AnimatedSwitch location={location}>
                         {routes.map(route => {
                              return (
                                   <Route exact
                                        key={route.path}
                                        path={route.path}
                                        component={route.component}
                                   />
                              )
                         })}
                    </AnimatedSwitch>
               </Content>
          </>
     )
})

export default App;
