import React, { useState, useEffect } from "react";
import Axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import styled from 'styled-components'

const Page = styled.div`
    height: 100%;
`

const FindMyCarPage = () => {
    
    const [findCar, setFindCar] = useState([])
    const jwt = localStorage.getItem('jwt')

    useEffect(() => {
        Axios({
            method: 'get',
            url: 'http://ezpark-next.herokuapp.com/api/v1/features/find_my_car',
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then(result => {
                setFindCar(result.data)
                console.log(result.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])


    return (
        <Page>
            <h1>Find My Car Page</h1>
        </Page>
    )
}

export default FindMyCarPage