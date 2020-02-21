import React, { useState } from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BigLogo from '../BigLogo.png'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import customToast from './toast'



//style
const container = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  // border:'solid black 0.1px'
}

const Timg = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '5vh',
}

const Tform = {
  marginTop: '10vh',
}

const form = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const img = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  filter: 'invert(100%)',
}

const btn2 = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '200px',
  backgroundColor: 'white',
  color: 'purple',
  borderRadius: '20px',
  border: ' solid 1px purple',
  margin: '4px'
}
//endstyle

//Don't touch
const LoginPage = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
      textAlign: 'center'
    },
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

export default function BasicTextFields() {
  const classes = LoginPage()

  const history = useHistory()
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  const handleUsername = e => {
    setUsernameInput(e.target.value)
  }

  const handlePassword = e2 => {
    setPasswordInput(e2.target.value)
  }
  
  // let API_KEY = process.env.REACT_APP_API
  const handleSubmit = e => {
    e.preventDefault()
    // console.log(`Username: ${usernameInput} , `, `Password: ${passwordInput} .`)
    Axios.post(`http://ezpark-next.herokuapp.com/api/v1/users/login`, {
        username: `${usernameInput}`,
        password: `${passwordInput}`
    })
    .then(result => {
      const {status, message, token, user} = result.data
        localStorage.setItem('jwt', token)
        history.push(`/home`)
        customToast.success(message, {
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)'
    });
        
      //   toast.success(message, 
    }).catch(err => {
      console.log(err.response.data.message)
      customToast.error(err.response.data.message,  {
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)'
      });
    }) 
}

  return (
    <div>
      <ToastContainer closeButton={false} autoClose={5000} style={{marginTop: '55px'}}/>
      <div style={container}>
      <div style={{ display:'flex',background:'#5d3194'}}>
          <Link to ="/">
            <IconButton className={classes.margin} size="big" style={{ color:'white', fontSize:30}}> 
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
          </Link>
          <h3 style={{ display:'block', color: 'white', margin:'auto 30%'}}>Login</h3>
      </div>
      
        <div style={Timg}>
          <img src={BigLogo} alt="logo" width="75%" style={img} />
        </div>
        <div style={Tform}>
          <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" style={form}>
            <TextField label="Username" name="username" onChange={handleUsername} value={usernameInput} />
            <TextField label="Password" type="password" name="password" onChange={handlePassword} value={passwordInput} />
            <button class="ui button" style={btn2}>Login</button>
          </form>
        </div>
      </div>
    </div>

  );
}