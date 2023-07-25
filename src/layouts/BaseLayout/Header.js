import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Divider, colors } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Login from '@mui/icons-material/Login';
import { Link } from "react-router-dom";

import useAuth from '../../hooks/useAuth';

import logo from "../../assets/images/logo.png";

export default function Header() {
  const { logout, auth, token } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ display: "flex", backgroundColor: "transparent" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img src={logo} width={200} height={100} />
          {token && (
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <WhatsAppIcon
                  sx={{ color: "green", fontSize: "30px" }}
                />
              </div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => { setAnchorEl(e.currentTarget) }}
                color="inherit"
              >
                <AccountCircle sx={{ color: "cornflowerblue", fontSize: "40px" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => { setAnchorEl(null) }}
              >
                <MenuItem style={{ fontWeight: "bold", color: "cornflowerblue" }}>{auth.name}</MenuItem>
                <Divider sx={{ m: 2 }} />
                <MenuItem onClick={() => { handleLogout() }}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
          {!token && (
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <WhatsAppIcon
                  sx={{ color: "green", fontSize: "30px" }}
                />
              </div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => { setAnchorEl(e.currentTarget) }}
                color="inherit"
              >
                <Login sx={{ color: "cornflowerblue", fontSize: "40px" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => { setAnchorEl(null) }}
              >
                <MenuItem onClick={() => setAnchorEl(null)}><Link to="/client/login" style={{ textDecoration: "none", color: "black" }}>Client</Link></MenuItem>
                <Divider sx={{ m: 2 }} />
                <MenuItem onClick={() => setAnchorEl(null)}><Link to="/admin/login" style={{ textDecoration: "none", color: "black" }}>Admin</Link></MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
