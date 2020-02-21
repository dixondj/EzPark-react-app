import React, { useState } from 'react'
import { directive } from '@babel/types';
import './carpark.css'
import Axios from 'axios'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

import { useHistory } from 'react-router-dom'
import customToast from '../pages/toast'
import { makeStyles } from "@material-ui/core/styles";


function FirstfloorLayout(props) {

    // let API_KEY = process.env.REACT_APP_API
    //dialog
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const useStyles = makeStyles(theme => ({
        root: {
            width: "70vw"
        }
    }));

    const history = useHistory()
    const classes = useStyles();
    const jwt = localStorage.getItem('jwt')
    const handleSubmit = () =>{
        setOpen(false);
        Axios({
            method: 'post',
            url: `http://ezpark-next.herokuapp.com/api/v1/features/history_add`,
            headers:{
                Authorization: `Bearer ${jwt}`,
            },
            data:{
                parking_id: parkingBay
            }
        })

        .then(result =>{
            console.log(result.data)
            history.push(`/findmycar`)
            customToast.success(result.data.message, {
                boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)'
            });
            
        })
        
        .catch(err => {
            console.log(err.response)
        })
    }
    
    // endDialog
    
    const mall = props.parking_details
    const parkingDetails = props.parking_details.parking1
    const [path1, setPath1] = useState(false)
    const [path2, setPath2] = useState(false)
    const [path3, setPath3] = useState(false)
    const [path4, setPath4] = useState(false)

    const [parkingBay, setparkingBay] = useState("")

    const [carpark1, setCarpark1] = useState([
        {
            lot: 'Bay 1',
            color: 'green',
            ...parkingDetails[0]
        },
        {
            lot: 'Bay 2',
            color: 'green',
            ...parkingDetails[1]
        },
        {
            lot: 'Bay 3',
            color: 'green',
            ...parkingDetails[2]
        },
        {
            lot: 'Bay 4',
            color: 'green',
            ...parkingDetails[3]
        }
    ])

    const store = (ind) => {
        setOpen(true);
        setparkingBay(ind)

    }
    const selectPath = (id) => {
        setPath1(false)
        setPath2(false)
        setPath3(false)
        setPath4(false)

        if (id == 1) {
            setPath1(!path1)
        }

        else if (id == 2) {
            setPath2(!path2)
        }
        else if (id == 3) {
            setPath3(!path3)
        }
        else {
            setPath4(!path4)
        }
    }

    return (
        <div className='baselayout'>
            <div className='carparklot'>
                <div className='carlot1' style={{}}>
                    {parkingDetails.map((lot, index) => (
                        <div key={index} className='carpark' name="car1"
                            onClick={() => lot.status ? store(lot.id) : selectPath(lot.id)} style={lot.status ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}>{lot.id}</div>
                    ))}
                </div>

                <div className='leveldown'>LEVEL DOWN</div>
                <div className='entrance'>ENTRANCE</div>
                <div className='levelup'>LEVEL UP</div>
                <div className='exit'>EXIT</div>
                <div className='entrance-boomgate'>
                    <div className='box1'></div>
                    <div className='box2'></div>
                </div>
                <div className='exit-boomgate'>
                    <div className='box3'></div>
                    <div className='box4'></div>
                </div>

                <div className='Arrows-bay1' style={path1 ? { display: 'block' } : { display: 'none' }}>
                    <div className='rightturn'>&#8625;</div>
                    <div className='upright'>&#8624;</div>
                    <div className='straight'>&#8673;</div>
                    <div className='leftturn'>&#8624;</div>
                </div>
                <div className='Arrows-bay2' style={path2 ? { display: 'block' } : { display: 'none' }} >
                    <div className='rightturn'>&#8625;</div>
                    <div className='upright'>&#8624;</div>
                    <div className='straight'>&#8673;</div>
                    <div className='rightturn2'>&#8625;</div>
                </div>
                <div className='Arrows-bay3' style={path3 ? { display: 'block' } : { display: 'none' }}>
                    <div className='rightturn'>&#8625;</div>
                    <div className='upright'>&#8624;</div>
                    <div className='leftturn2'>&#8624;</div>
                </div>
                <div className='Arrows-bay3' style={path4 ? { display: 'block' } : { display: 'none' }}>
                    <div className='rightturn'>&#8625;</div>
                    <div className='upright'>&#8624;</div>
                    <div className='rightturn3'>&#8625;</div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className={classes.root} id="alert-dialog-title"><WarningIcon/>&nbsp;{"Did you park here?"} </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p><strong>Parking Bay: {parkingBay}</strong></p>
                        <p>Mall: {mall.mall}</p>
                        <p>Floor: {mall.floor[0]}</p><br/>
                        <p><strong>⚠ Add this to find my car park!<DriveEtaIcon style={{paddingTop: '7px', fontSize: '1.5em'}} fontSize="large"/></strong></p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">
                        Add
                    </Button>
                    <Button onClick={handleClose} color="primary" autoForcus>
                        Cancel
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}
export default FirstfloorLayout;