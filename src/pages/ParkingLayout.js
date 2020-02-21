import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import Loading from "../components/Loading";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { nominalTypeHack } from "prop-types";
import FirstfloorLayout from "../components/CarPark1";
import SecondfloorLayout from "../components/CarPark2";

import '../App.css';

const useStyles2 = makeStyles({
    root: {
        flexGrow: 1,
    }
});

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


const ParkingLayout = () => {
    const params = useParams()
    const classes = useStyles();
    const classes2 = useStyles2();
    const [isLoading, setIsLoading] = useState(true)
    const [mall, setMall] = useState({})
    const [value, setValue] = React.useState(0);
    let timer;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        timer = setInterval(() => get_item(), 2500)
    }, [])

    // let API_KEY = process.env.REACT_APP_API
    const jwt = localStorage.getItem('jwt')
    const get_item = () => {
        Axios({
            method: 'post',
            url: `http://ezpark-next.herokuapp.com/api/v1/features/layout/id`,
            data: {
                mall_id: `${params.id}`
            },
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then(result => {
                setMall(result.data)
                // console.log(result.data)
                setIsLoading(false)

            })
            .catch(err => {
                setIsLoading(false)
                console.log(err.response)
            })
    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div style={{ display: 'flex', background: '#5d3194' }}>
                <Link to="/home">
                    <IconButton className={classes.margin} size="big" style={{ color: 'white', fontSize: 30 }}>
                        <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                </Link>
                <h3 style={{ display: 'block', color: 'white', margin: 'auto 27%' }}>{mall.mall}</h3>
            </div>
            <div>
                <Paper className={classes2.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        {
                            mall.floor.map((floor, index) => (
                                <Tab label={floor + mall.amount[index]} />
                            ))
                        }
                    </Tabs>
                </Paper>
                {mall.mall == 'EzMall' ?
                    <div>
                        <div>
                            {value == 0 ? <FirstfloorLayout parking_details={mall} /> : <SecondfloorLayout parking_details={mall} />}
                        </div>
                        <div style={{bottom:40 , position:'absolute',fontFamily: "'Nunito', sans-serif", width:'100%', textAlign:'center'}}>
                            <b style={{color:'green'}}>⚠ Click the green parking bay to show you the route!</b><br/>
                            <b style={{color:'red'}}>⚠ Click the red parking bay to save your parking info!</b>
                        </div>
                    </div> :
                    <div>
                        <h1>Coming Soon...</h1>
                    </div>
                }
            </div>
        </div>  
    )
}

export default ParkingLayout