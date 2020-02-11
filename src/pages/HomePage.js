import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Axios from 'axios';
import BigLogo from '../BigLogo.png'

// style
const container = {
    position: 'relative',
    height: '100%',
    background: 'black',
    backgroundImage: `url(${BigLogo})`
}

const opacityColor = {
    background: 'lightGray',
    opacity: 0.6,
    height: '100%',
}

const searchBar = {
    position: 'absolute',
    left: '50%',
    top: '30%',
    transform: 'translate( -50%, -50%)',
    opacity: 1
}


// endstyle


const HomePage = () => {

    useEffect(() => {
        // performing a GET request
        Axios.get('http://ezpark-next.herokuapp.com/api/v1/features/')
            .then(result => {
                // If successful, we do stuffs with 'result'
                console.log(result.data.mall)
                setMall(result.data.mall)
            })
            .catch(error => {
                // If unsuccessful, we notify mall what went wrong
                console.log('ERROR: ', error)
            })
    }, [])

    const [malls, setMall] = useState([])

    return (
        <div style={container}>
            <div style={opacityColor} />
            <div style={searchBar}>
                <h1>What Mall ?</h1>
                <Autocomplete
                    id="combo-box-demo"
                    options={malls}
                    getOptionLabel={option => option.name}
                    style={{ width: 300 }}
                    renderInput={params => (
                        <TextField {...params} label="Select Mall..." variant="outlined" fullWidth class='MuiOutlinedInput-root' />
                    )}
                />
            </div>
    
        </div >
    )
}

export default HomePage