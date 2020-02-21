import React,{useState} from 'react'
import { directive } from '@babel/types';
import Logo from "../carimage.jpg"
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

function SecondfloorLayout(props) {

    // let API_KEY = process.env.REACT_APP_API
    //for dialog
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


    const mall = props.parking_details
    const parkingDetails = props.parking_details.parking2

    const [parkingBay, setparkingBay] = useState("")

    const [path1, setPath1] = useState(false)
    const [path2, setPath2] = useState(false)
    const [path3, setPath3] = useState(false)
    const [path4, setPath4] = useState(false)

    const [carpark1,setCarpark1] = useState([
        {
            lot:'Bay 5',
            color:'green',
            ...parkingDetails[0]
        },
        {
            lot:'Bay 6',
            color:'green',
            ...parkingDetails[1]
        },
        {
            lot:'Bay 7',
            color:'green',
            ...parkingDetails[2]
        },
        {
            lot:'Bay 8',
            color:'green',
            ...parkingDetails[3]
        }
    ])
    // const changeColor = (lotNum)=>{
    //     setCarpark1(carpark1.map((lot)=>{
    //         if (lotNum == lot.lot) {
    //             if (lot.color == "green") {
    //                 return {lot:lot.lot,color:'red'}
    //             } else {
    //                 return {lot: lot.lot, color: 'green'}
    //             }
    //         } else {
    //             return lot
    //         }
    //    }))
    // }

    const store = (ind) => {
        setOpen(true);
        setparkingBay(ind)
    }

    const selectPath = (id) => {
        setPath1(false)
        setPath2(false)
        setPath3(false)
        setPath4(false)

        if (id == 5) {
            setPath1(!path1)
        }

        else if (id == 6) {
            setPath2(!path2)
        }
        else if (id == 7) {
            setPath3(!path3)
        }
        else {
            setPath4(!path4)
        }
    }
    return(
        <div className='baselayout'>
            <div className='carparklot'>
                <div className='carlot1' style={{}}>
                    {parkingDetails.map((lot,index) => (
                        <div key={index} className='carpark' name="car1" style={lot.status ? {backgroundColor: 'red'}: {backgroundColor: 'green'}} onClick={()=> lot.status ? store(lot.id):selectPath(lot.id)}>{lot.id}</div>
                    ))}        
                </div>
                {/* <div className='leveldown2'>LEVEL DOWN</div> */}
                <div className='Secondfloorentrance'>2ND FLOOR</div>
                <div className='Arrows-bay5' style={path1 ? { display: 'block' } : { display: 'none' }}>
                <div className='downright'>&#8625;</div>
                <div className='rightdown'>&#8624;</div>
                <div className='downleft'>&#8625;</div>
                </div>
                <div className='Arrows-bay6' style={path2 ? { display: 'block' } : { display: 'none' }}>
                <div className='downright'>&#8625;</div>
                <div className='rightdown'>&#8624;</div>
                <div className='downright2'>&#8624;</div>
                </div>
                <div className='Arrows-bay7' style={path3 ? { display: 'block' } : { display: 'none' }}>
                <div className='downright'>&#8625;</div>
                <div className='rightdown'>&#8624;</div>
                <div className='down'>&#8675;</div>
                <div className='downleft2'>&#8625;</div>
                </div>
                <div className='Arrows-bay8' style={path4 ? { display: 'block' } : { display: 'none' }}>
                <div className='downright'>&#8625;</div>
                <div className='rightdown'>&#8624;</div>
                <div className='down'>&#8675;</div>
                <div className='downright3'>&#8624;</div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className={classes.root} id="alert-dialog-title"><WarningIcon/>&nbsp;{"Did you park here?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p><strong>Parking Bay: {parkingBay}</strong></p>
                        <p>Mall: {mall.mall}</p>
                        <p>Floor: {mall.floor[1]}</p>
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
export default SecondfloorLayout;