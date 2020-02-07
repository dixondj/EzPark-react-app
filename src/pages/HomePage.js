import React from 'react'
import { useHistory } from 'react-router-dom'

const HomePage = () => {

    const history = useHistory()

    const handleClick = e =>{
        e.preventDefault()
        localStorage.removeItem('jwt')
        history.push('/')
    }

    return(
        <>
        <h1>This is the homepage</h1>
        <p>Please continue the development ! :)</p>
        <button onClick={handleClick}>Log Out</button>
        </>
    )
}

export default HomePage