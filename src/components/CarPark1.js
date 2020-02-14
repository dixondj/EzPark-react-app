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

function FirstfloorLayout(props) {

    //dialog
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    
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
        })

        .catch(err => {
            console.log(err.response)
            console.log(parkingBay)
        })
    }

    // endDialog

    const mall = props.parking_details
    const parkingDetails = props.parking_details.parking1
    // console.log(parkingDetails)
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

    // const newChangeColor = ind => {
    //     let newLot;
    //     if (carpark1[ind].status == false) {
    //         newLot = carpark1.map((lot, index) => (
    //             ind === index ? ({ lot: lot.lot, color: 'red' }) : lot
    //         ))
    //     } else {
    //         newLot = carpark1.map((lot, index) => (
    //             ind === index ? ({ lot: lot.lot, color: 'green' }) : lot
    //         ))
    //     }
    //     setCarpark1(newLot)
    // }

    // const changeColor = (ind)=>{
    //     console.log(ind)
    //     let newLot;
    //     if (carpark1[ind].color=='green'){
    //         newLot = carpark1.map((lot,index)=>(
    //             ind===index ? ({lot:lot.lot,color:'red'}) : lot
    //         ))
    //     }else{
    //         newLot = carpark1.map((lot,index)=>(
    //             ind===index ? ({lot:lot.lot,color:'green'}) : lot
    //         ))
    //     }
    //     setCarpark1(newLot)
    // }


    const store = (ind) => {
        setOpen(true);
        setparkingBay(ind)

        console.log('Bye')
    }
    const selectPath = (id) => {
        setPath1(false)
        setPath2(false)
        setPath3(false)
        setPath4(false)

        console.log(id)
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
                {/* <div className='carlot2'> */}
                {/* </div> */}
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
                {/* <div className='Next-level'>
                    <div className='rightturn'>&#8625;</div>
                    <div className='upright'>&#8624;</div>
                    <div className='straight'>&#8673;</div>
                    <div className='straight2'>&#8673;</div>
                    <div className='rightturn4'>&#8625;</div>
                    <div className='upright2'>&#8624;</div>
                </div> */}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Comfirmation..."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>Mall: {mall.mall}</p>
                        <p>Floor: {mall.floor[0]}</p>
                        <p>Parking Bay: {parkingBay}</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">
                        Confirm
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