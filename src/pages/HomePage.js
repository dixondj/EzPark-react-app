import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Axios from 'axios';
import BigLogo from '../BigLogo.png'
import { ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// style
const container = {
    position: 'relative',
    height: '100%',
    background: '#efefef',
    backgroundImage: `url(${BigLogo})`
}

// const opacityColor = {
//     background: 'white',
//     opacity: 0.6,
//     height: '100%',
// }

const searchBar = {
    position: 'absolute',
    left: '50%',
    top: '30%',
    transform: 'translate( -50%, -50%)',
    opacity: 1
}

const btn ={
    color:'purple',
    border:'solid 1px purple',
    width:'50%',
}
// endstyle

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


const HomePage = () => {
    const [malls, setMall] = useState([])
    const [mallName, setMallName] = useState("")
    const classes = useStyles();

    const history = useHistory()

    // let API_KEY = process.env.REACT_APP_API

    useEffect(() => {
        // performing a GET request
        Axios.get(`http://ezpark-next.herokuapp.com/api/v1/features/`)
            .then(result => {
                // If successful, we do stuffs with 'result'
                setMall(result.data.mall)
            })
            .catch(error => {
                // If unsuccessful, we notify mall what went wrong
                console.log('ERROR: ', error)
            })
    }, [])

    const handleInput = (e, v) => {
        setMallName(v)
    }


    const handleMallSelect = e => {
        e.preventDefault()
        Axios({
            method: 'post',
            url: `http://ezpark-next.herokuapp.com/api/v1/features/layout`,
            data: {
                mall: `${mallName.name}`
            }
        })

            .then(result => {
                history.push({
                    pathname: '/parkinglayout/' + result.data.id
                })
            })

            .catch(err => {
                console.log(err.response)
            })
    }

    return (

        <div style={container}>
            <ToastContainer closeButton={false} autoClose={5000} />
            {/* <div style={opacityColor} /> */}
            <div style={searchBar}>
                <h1>What Mall ?</h1>
                <form onSubmit={handleMallSelect}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={malls}
                        getOptionLabel={option => option.name}
                        style={{ width: 300 }}
                        // onChange={(e,v) => setMallName(v)}
                        onChange={handleInput}
                        renderInput={params => (
                            <TextField {...params} label="Select Mall..." variant="outlined" fullWidth class='MuiOutlinedInput-root' />
                        )}
                    />
                    <div className={classes.root}>
                        <Button type="submit" style={btn}>Submit</Button>
                    </div>
                </form>
            </div>

        </div >
    )
}

export default HomePage