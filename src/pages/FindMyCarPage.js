import React, { useState, useEffect } from "react";
import Axios from 'axios';
import styled from 'styled-components'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


import StoreIcon from "@material-ui/icons/Store";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import TodayIcon from "@material-ui/icons/Today";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Loading from "../components/Loading";

import { ToastContainer } from 'react-toastify';

const Page = styled.div`
    height: 100%;
    `

const useStyles = makeStyles({
    root: {
        minWidth: 350,
        color: "theme.palette.text.primary"
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

const FindMyCarPage = () => {
    // let API_KEY = process.env.REACT_APP_API

    const classes = useStyles();
    const [findCar, setFindCar] = useState([])
    
    const jwt = localStorage.getItem('jwt')
    useEffect(() => {
        Axios({
            method: 'get',
            url: `http://ezpark-next.herokuapp.com/api/v1/features/find_my_car`,
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
        .then(result => {
            setFindCar(result.data)
            console.log(result.data)
            setIsLoading(false)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])
    
    const [isLoading, setIsLoading] = useState(true)
    if (isLoading) {
        return <Loading />
    }
    
    return (
        <Page>
            <ToastContainer closeButton={false} autoClose={5000} style={{marginTop: '55px'}}/>
            <Card className={classes.root} style={{ margin: '5px' }} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Info
                     </Typography>
                    <table>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>

                        <Typography className={classes.pos} color="textSecondary" />
                        <Typography variant="body2" component="p">
                            <tr>
                                <Grid container className={classes.root}>
                                    <Grid item xs={1}>
                                        <StoreIcon />
                                    </Grid>
                                    <td style={{ width: "39%" }}>
                                        <Typography><b>Mall :</b></Typography>
                                    </td>
                                    <td style={{ width: "52%", textAlign: "right" }}>
                                        <Typography>{findCar.mall}</Typography>
                                    </td>
                                </Grid>
                            </tr>
                            <br />
                            <tr>
                                <Grid container className={classes.root}>
                                    <Grid item xs={1}>
                                        <FilterNoneIcon fontSize="small" />
                                    </Grid>
                                    <td style={{ width: "39%" }}>
                                        <Typography><b>Floor :</b></Typography>
                                    </td>

                                    <td style={{ width: "52%", textAlign: "right" }}>
                                        <Typography>{findCar.floor}</Typography>
                                    </td>
                                </Grid>
                            </tr>
                            <br />
                            <tr>
                                <Grid container className={classes.root}>
                                    <Grid item xs={1}>
                                        <LocalParkingIcon />
                                    </Grid>
                                    <td style={{ width: "39%" }}>
                                        <Typography><b>Parking Bay : </b></Typography>
                                    </td>
                                    <td style={{ width: "52%", textAlign: "right" }}>
                                        <Typography>{findCar.parking}</Typography>
                                    </td>
                                </Grid>
                            </tr>
                            <br />
                            <tr>
                                <Grid container className={classes.root}>
                                    <Grid item xs={1}>
                                        <TodayIcon />
                                    </Grid>
                                    <td style={{ width: "39%" }}>
                                        <Typography><b>Date :</b></Typography>
                                    </td>

                                    <td style={{ width: "52%", textAlign: "right" }}>
                                        <Typography>{findCar.date}</Typography>
                                    </td>
                                </Grid>
                            </tr>
                            <br />
                            <tr>
                                <Grid container className={classes.root}>
                                    <Grid item xs={1}>
                                        <AccessTimeIcon />
                                    </Grid>
                                    <td style={{ width: "39%" }}>
                                        <Typography><b>Time :</b></Typography>
                                    </td>
                                    <td style={{ width: "52%", textAlign: "right" }}>
                                        <Typography>{findCar.time}</Typography>
                                    </td>
                                </Grid>
                            </tr>
                        </Typography>
                    </table>
                </CardContent>
            </Card>
        </Page>
    )
}

export default FindMyCarPage