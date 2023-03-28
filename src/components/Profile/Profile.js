/*ชินวัตร บูรพา*/ 

import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";
import FaceRetouchingOffOutlinedIcon from '@mui/icons-material/FaceRetouchingOffOutlined';
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';  




export default function AccountMenu() {
const [Emails, setEmails] = useState({ UserEmail: "" });

  useEffect(() => {
    function ShowEmail() {
      const token = localStorage.getItem("token");
      fetch("http://localhost:3333/GetEmail", {
        method: "get",
        headers: { authorization: token },
      })
        .then((response) => response.json())
        .then((data) => {
          setEmails({ UserEmail: data[0].Email });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    ShowEmail();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    window.location = "/Login";
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AccountCircleOutlinedIcon sx={{ width: 32, height: 32 }}></AccountCircleOutlinedIcon>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        
        {isLoggedIn ? (
          <MenuItem onClick={handleClose}>
            <Avatar />
            {Emails.UserEmail}
          </MenuItem>
        ) : null}
        <Divider />
        {isLoggedIn ? (
          <MenuItem onClick={handleLogout}>
            <FaceRetouchingOffOutlinedIcon fontSize="small" />&nbsp;
            Logout
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLogin}>
            <FaceRetouchingNaturalOutlinedIcon fontSize="small" />&nbsp;
             LOGIN
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}
