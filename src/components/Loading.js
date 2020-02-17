import React from 'react';
import BigLogo from '../BigLogo.png'
import '../App.css';

const container = {
    position: 'relative',
    height: '100%',
    textAlign: 'center',
}

const logo = {
    position: 'fixed',
    left: '31%',
    top: '33.5%',
    transform: 'translate(-50%, -50%)',
}

const circle ={
    position: 'fixed',
    left: '49%',
    top: '42%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    background: 'rgb(93, 49, 148)',
    height: '100px',
    width: '100px',
}

const Loading = () => {
    return (
        <div className="App" style={container}>
            <div style={circle} />
            <img src={BigLogo} className="App-logo" alt="logo" style={logo} />
        </div>
    )
}

export default Loading