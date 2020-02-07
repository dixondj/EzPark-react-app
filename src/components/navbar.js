import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
const MyNav = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
    <Navbar bg="dark">
      <Navbar.Brand href="/">
        <img
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
    </Navbar>
  </>
  );
}

export default MyNav;