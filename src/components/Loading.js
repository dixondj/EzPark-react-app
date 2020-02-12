import React from 'react';
import BigLogo from '../BigLogo.png'
import '../App.css';

const container = {
    position: 'relative',
    height: '100%',
    textAlign: 'center',
}

const logo = {
    // filter: 'invert(100%)',
    position: 'absolute',
    left: '31%',
    top: '30%',
    transform: 'translate( -50%, -50%)',
}

const circle ={
    position: 'absolute',
    left: '50%',
    top: '40%',
    transform: 'translate( -50%, -50%)',
    borderRadius: '50%',
    background: '#5d3194',
    height: '100px',
    width: '100px',
    // border: 'solid black 2px'
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