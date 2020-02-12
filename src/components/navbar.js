import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';

import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

const useStyles = makeStyles({
  root: {
    background: '#482278',
    position: 'fixed',
    height: '55px',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
const useStyles2 = makeStyles({
  root: {
    color:'#C8A2C8'
  },
});

const Navbar = (props) => {
  let history = useHistory()
  const classes = useStyles();
  const classes2 = useStyles2();
  const [value, setValue] = React.useState(0);

  const handleNavigate = e => {
    history.push(e.currentTarget.name)
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction  className={classes2.root} onClick={handleNavigate} name="/home" label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction  className={classes2.root} onClick={handleNavigate} name="/findmycar" label="Find My Car" icon={<DriveEtaIcon />} />
      <BottomNavigationAction  className={classes2.root} onClick={handleNavigate} name="/history" label="History" icon={<RestoreIcon />} />
      <BottomNavigationAction  className={classes2.root} onClick={handleNavigate} name="/setting" label="Setting" icon={<SettingsIcon />} />
    </BottomNavigation>
  )
}

export default Navbar