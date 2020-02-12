import React from 'react'

const navbar = {
    display: 'flex',
    background: '#5d3194',
    position: 'fixed',
    height: '54px',
    top: 0,
    left:0,
    right:0,
  }

const TopNavbar = ({ title }) => {
    return (
        <div>
            <div style={navbar}>
                <h3 style={{ display: 'block', color: '#FBFBFB', margin: 'auto' }}>{title}</h3>
            </div>
        </div>
    )
}
export default TopNavbar