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
import TopNavbar from './components/topNavbar';
import ParkingLayout from './pages/ParkingLayout';

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
     },

     {
          component: ParkingLayout,
          path: "/parkinglayout/:id"
     }
]


const Content = styled.div`
     position: fixed;
     top: ${props => props.isTopFullScreen ? '0' : '55px'};;
     left: 0;
     right: 0;
     bottom: ${props => props.isFullScreen ? '0' : '55px'};
     overflow-y: scroll;
     `

const pathsWithoutNav = [
     '/parkinglayout',
     '/login',
     '/signup',
]

const pathsWithoutTopNav = [
     '/parkinglayout',
     '/home',
     '/login',
     '/signup',
]

const pageTitles = {
     '/setting': 'Setting',
     '/history': 'History',
     '/findmycar': 'Find My Car',
}

const App = withRouter(({ location }) => {
     const isFullScreen =  location.pathname === '/' ? true : pathsWithoutNav.some(path => location.pathname.startsWith(path))
     const isTopFullScreen =  location.pathname === '/' ? true : pathsWithoutTopNav.some(path => location.pathname.startsWith(path))
     return (
          <div>
               {
                    isFullScreen  ? '' : <Navbar />
               }
               {
                    isTopFullScreen  ? '' : <TopNavbar title={pageTitles[location.pathname]}/>
               }
               <Content isFullScreen={isFullScreen} isTopFullScreen={isTopFullScreen}>
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
          </div>
     )
})

export default App;
