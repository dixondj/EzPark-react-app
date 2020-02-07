import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import styled from 'styled-components';
import Axios from 'axios';
import { useHistory } from 'react-router-dom'

import MyNav from '../components/navbar';

//styled components css
const Wrapper = styled.section`
    background: white;
    padding-top: 100px;
`;

const Form = styled.form`
    text-align: center;
    justify-content: center;
`
//end styled components

//css
const btn1 = {
  marginTop: '20px'
}
//end css

//material-ui css
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 300,
    },
  },
  margin: {
    margin: theme.spacing(0),
  },
}));


//end material-ui

function SignupPage() {
  const classes = useStyles();
  const history = useHistory()

  const [userInfo, setUserInfo] = useState ({
      username: '',
      first_name: '',
      last_name: '',
      password: '',
      email: '',
      hp_number: '',
  })
  const { username, first_name,last_name,email, password,hp_number } = userInfo


  const handleInput = e => {
    const {name, value} = e.target
    
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    Axios.post('http://ezpark-next.herokuapp.com/api/v1/users/signup', {
      username,
      first_name,
      last_name,
      password,
      email,
      hp_number,
    })
    .then(result => {
      const {status, message, user} = result.data
      console.log(result)
      console.log(status)
      console.log(message)
      console.log(user)
      history.push('/login')
      
    })
    .catch(err => {
      console.log(err.response)
    })

  }

  return (
    <>
      {/* <MyNav /> */}
      <div>
        <div style={{ display:'flex',background:'purple'}}>
          <Link to ="/">
            <IconButton className={classes.margin} size="big" style={{ color:'white', fontSize:30}}> 
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
          </Link>
          <h3 style={{ display:'block', color: 'white', margin:'auto 120px'}}>Register</h3>
        </div>
      </div>
      <Form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
        <TextField name="first_name" required id="standard-required" label="First Name" variant="standard" value={first_name} onChange={handleInput}/>
        <TextField name="last_name" required id="standard-required" label="Last Name" variant="standard" value={last_name} onChange={handleInput}/>
        <TextField name="hp_number" required id="standard-required" label="Mobile Number" variant="standard" value={hp_number} onChange={handleInput}/>
        <TextField name="username" required id="standard-required" label="Username" variant="standard" value={username} onChange={handleInput}/>
        <TextField name="email" required id="standard-required" label="Email" variant="standard" value={email} onChange={handleInput}/>
        <TextField name="password" required id="standard-password-input" label="Password" type="password" autoComplete="current-password" value={password} onChange={handleInput}/>
        <button class="ui purple basic button" style={btn1}>Create an account</button>
      </Form>
    </>
  );
}

export default SignupPage