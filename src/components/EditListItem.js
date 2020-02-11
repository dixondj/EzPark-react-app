import React from 'react'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

const EditListItem = ({ title, subtitle, onClick, iconComponent }) => {
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                       {iconComponent}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={title} secondary={subtitle} />
                <Button variant="outlined" color="primary" onClick={onClick}>
                    <EditIcon fontSize="small" />
                </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}

export default EditListItem