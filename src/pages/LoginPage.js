import React, { useState } from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BigLogo from '../BigLogo.png'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { useHistory } from 'react-router-dom'

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

  const handleSubmit = e => {
    e.preventDefault()
    // console.log(`Username: ${usernameInput} , `, `Password: ${passwordInput} .`)
    Axios.post('http://ezpark-next.herokuapp.com/api/v1/users/login', {
        username: `${usernameInput}`,
        password: `${passwordInput}`
    })
    .then(result => {
      const {status, message, token, user} = result.data
        localStorage.setItem('jwt', token)
        console.log(status)
        console.log(message)
        console.log(token)
        console.log(user)
        history.push(`/home`)
    }).catch(err => {
      console.log(err.response.data.message)
    })
}

  return (
    <div>
      <div style={container}>
        <div style={{ display: 'block', background: 'purple' }}>
          <Link to="/">
            <IconButton className={classes.margin} size="big" style={{ color: 'white', fontSize: 30 }}>
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
          </Link>
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