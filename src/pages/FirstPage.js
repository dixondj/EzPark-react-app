import React from 'react'
import BigLogo from '../BigLogo.png'
import {Link} from 'react-router-dom'

const container = {
    display:'flex',
    flexDirection:'column',
}

const Timg = {
    display:'flex',
    flexDirection:'column',
    marginTop: '15vh',
}

const Tbtn = {
    marginTop: '15vh',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
}

const btn1 = {
    width:'200px',
    backgroundColor: 'Transparent',
    color: 'white',
    borderRadius: '20px',
    border:' solid 1px white',
    margin:'4px'
}

const btn2 = {
    marginLeft:'auto',
    marginRight:'auto',
    width:'200px',
    backgroundColor: 'white',
    color: 'blue', 
    borderRadius: '20px',
    margin:'4px'
}

const img = {
    display:'block',
    marginLeft:'auto',
    marginRight:'auto',
}


const FirstPageButton = () =>{
    return(
        <div class='Body' style={container}>
            <div style={Timg}>
                <img src={BigLogo} alt="logo" width="75%" style={img}/>
            </div>
            <div style={Tbtn}>  
                <Link to="/login">
                    <button class="ui button" style={btn1}>Login</button>
                </Link>
                <Link to="/signup">
                     <button class="ui button" style={btn2}>Sign Up</button>
                </Link>
            </div>
        </div>
    )
}

export default FirstPageButton