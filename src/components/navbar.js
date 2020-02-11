import React from 'react'
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';

const navbar = {
  display: 'flex',
  background: 'purple',
  justifyContent: 'space-around',
  position: 'fixed',
  height: '55px',
  bottom: 0,
  left:0,
  right:0,
  zIndex: 1
}

const Navbar = (props) => {
  return (
    <div style={navbar}>
      <Link to="/home">
        <IconButton size="big" style={{ color: 'white', fontSize: 30 }}>
          <HomeIcon fontSize="inherit" />
        </IconButton>
      </Link>
      <Link to="/findmycar">
        <IconButton size="big" style={{ color: 'white', fontSize: 30 }}>
          <DriveEtaIcon fontSize="inherit" />
        </IconButton>
      </Link>
      <Link to="/history">
        <IconButton size="big" style={{ color: 'white', fontSize: 30 }}>
          <HistoryIcon fontSize="inherit" />
        </IconButton>
      </Link>
      <Link to="/setting">
        <IconButton size="big" style={{ color: 'white', fontSize: 30 }}>
          <SettingsIcon fontSize="inherit" />
        </IconButton>
      </Link>
    </div>
  )
}

export default Navbar