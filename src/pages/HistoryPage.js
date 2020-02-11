import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    root: {
        margin: '20px'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12,
        fontSize: '12px'
    }
});

// Don't touch
const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        width: '80vw'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
//EndDon't touch

const HistoryPage = () => {
    const [history, setHistory] = useState([])
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [modalHistory, setModalHistory] = useState({})

    const handleClickOpen = (history) => {
        setOpen(true);
        setModalHistory(history)
    };
    const handleClose = () => {
        setOpen(false);
        setModalHistory({})
    };


    const jwt = localStorage.getItem('jwt')
    useEffect(() => {
        Axios({
            method: 'get',
            url: 'http://ezpark-next.herokuapp.com/api/v1/features/history',
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then(result => {
                setHistory(result.data.history)
                console.log(result.data.history)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    const handleDelete = e => {
        const historyId = e.currentTarget.name
        console.log(historyId)
        Axios({
            method: 'post',
            url: `http://ezpark-next.herokuapp.com/api/v1/features/history_delete/${historyId}`,
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })

            .then(result => {
                setHistory(result.data.history)
                console.log(result.data)
            })

            .catch(err => {
                console.log(err.response)
            })
    }

    if (!history.length) return <div>No History</div>

    return (
        <div style={{height: '100%' }}>
            {history.map(history => (
                <>
                    <Card className={classes.root}>
                        <CardActions>
                            <Button onClick={() => { handleClickOpen(history)} } name={history.id} >
                                <CardContent style={{ width: "100vw", textAlign: "left" }}>
                                    <Typography variant="h5" component="h2">
                                        {history.mall}
                                    </Typography>
                                    <Typography className={classes.pos}>{history.date}</Typography>
                                </CardContent>
                            </Button>
                            <Button onClick={handleDelete} name={history.id}>
                                <CloseIcon />
                            </Button>
                        </CardActions>
                    </Card>
                </>
            ))}
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                History ID : {modalHistory.id}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <p>Mall: {modalHistory.mall}</p>
                        <p>Floor: {modalHistory.floor}</p>
                        <p>Parking Bay: {modalHistory.parking}</p>
                        <p>Date: {modalHistory.date}</p>
                        <p>Time: {modalHistory.time}</p>
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default HistoryPage