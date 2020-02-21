import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import EditIcon from "@material-ui/icons/Edit";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import styled from 'styled-components'
import EditListItem from "../components/EditListItem";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify'

const Page = styled.div`
    height: 100%;
`
const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper
    }
}));

const SettingPage = () => {
    // let API_KEY = process.env.REACT_APP_API
    const classes = useStyles();
    const [user, setUser] = useState({})
    const [info, setInfo] = useState(null)

    let history = useHistory()
    let textInput = React.createRef();

    useEffect(() => {
        Axios({
            url: `http://ezpark-next.herokuapp.com/api/v1/users/current_user`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.jwt}`
            }
        })
            .then(result => {
                setUser(result.data.user)
            })
    }, [])

    // when modal is hidden, open is null
    // when modal is shown, open is {title: '', subititle: '', }

    const handleClickOpen = (info) => {
        setInfo(info);
    }

    const handleClose = () => {
        setInfo(null);
    };


    const handleSubmit = e => {
        e.preventDefault()
        Axios({
            url: `http://ezpark-next.herokuapp.com/api/v1/users/${info.api_url}`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.jwt}`
            },
            data: {
                [textInput.current.name]: textInput.current.value
            }
        })
            .then(result => {
                setUser(result.data.user)
                handleClose()
                toast.success(result.data.message, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
            .catch(err => {
                toast.error(err.response.data.message[0], {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
    }

    const listData = [
        { api_url: 'edit_username', fieldName: 'new_username', title: "Username", subtitle: user.username, iconComponent: <AccountCircleIcon />, dialogContent: 'Edit your username' },
        { api_url: 'edit_firstname', fieldName: 'new_firstname', title: "First Name", subtitle: user.first_name, iconComponent: <AccountBoxIcon />, dialogContent: 'Edit your First Name' },
        { api_url: 'edit_lastname', fieldName: 'new_lastname', title: "Last Name", subtitle: user.last_name, iconComponent: <AccountBoxIcon />, dialogContent: 'Edit your Last Name' },
        { api_url: 'edit_email', fieldName: 'new_email', type: 'email', title: "Email", subtitle: user.email, iconComponent: <EmailIcon />, dialogContent: 'What is the new email address?' },
        { api_url: 'edit_password', fieldName: 'new_password', type: 'password', title: "Password", subtitle: '*********', iconComponent: <VpnKeyIcon />, dialogContent: 'Really want to chnage password?' },
        { api_url: 'edit_hp', fieldName: 'new_hp', title: "Phone Number", subtitle: user.hp_number, iconComponent: <PhoneIcon />, dialogContent: 'You should upload your new phone?' },
    ]

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        history.push('/')
    }

    return (
        <Page>
            <ToastContainer closeButton={false} autoClose={5000}/>
            <div style={{ paddingTop: '2%' }}>
                <Typography variant="h5" component="h2" style={{ marginLeft: '5%' }}>User Info</Typography>
                <List className={classes.root}>
                    {
                        listData.map(listInfo => <EditListItem key={listInfo.title} {...listInfo} onClick={() => { handleClickOpen(listInfo) }} />)
                    }
                </List>
                <Dialog
                    open={info !== null}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Edit {info && info.title}
                        <Button onClick={handleClose} color="primary">
                            <CloseIcon />
                        </Button>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {info && info.dialogContent}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            name={info && info.fieldName}
                            margin="dense"
                            id={info && info.api_url}
                            inputRef={textInput}
                            fullWidth
                            type={(info && info.type) || 'text'}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit} color="primary">
                            Submit
                    </Button>
                    </DialogActions>
                </Dialog>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Button variant="contained" color="secondary" style={{ width: '80%', marginTop: '5%' }} onClick={handleLogout} >
                        <ExitToAppIcon style={{ marginRight: '10px' }} />
                        Logouts
                </Button>
                </div>
            </div>
        </Page>
    )
}
export default SettingPage