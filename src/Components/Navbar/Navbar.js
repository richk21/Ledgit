import React, { useContext, useState } from 'react';
import './Navbar.css';
import { IconButton, Menu, MenuItem, useMediaQuery, ListItemIcon, ListItemText, Badge } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Link } from 'react-router-dom';
import blogicon from '../../Assets/pencil-square.svg'
import notifications from '../NotificationList/NotificationData';
import NotificationList from '../NotificationList/NotificationList';
import { useLogin } from '../../utils/loginContext';

const Navbar = () => {
  const {isloggedin, login, logout } = useLogin();
  /* const isloggedin = false; */
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl);
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isMobileMenuOpen = Boolean(mobileAnchorEl);
  const isMobile = useMediaQuery('(max-width:768px)');


  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  }

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  }

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setNotificationsAnchorEl(null);
    setProfileAnchorEl(null);
    setMobileAnchorEl(null);
  }

  const handlelogout = () => {
    logout();
  }


  return (
    <div className="navbar">
      <Link to='/' style={{ display: 'flex', alignItems:'center', width:'50%'}}>
        <img src={blogicon} className='blog-icon'/>
        <h1 className="heading">
            <span className="ledg">Ledg</span>
            <span className="it">It</span>
        </h1>
        <h1 className="heading-min">
            <span className="ledg">L</span>
            <span className="it">it</span>
        </h1>
      </Link>
        {!isMobile ? <div className='menu-box'>
          {isloggedin ? 
              <div className="right-section">
                {/* notifications menu option */}
                <IconButton 
                  edge="end" 
                  color="inherit" 
                  aria-label='notificationsMenu' 
                  aria-controls='menu-notifications' 
                  aria-haspopup="true" 
                  onClick={handleNotificationsMenuOpen}
                >
                    <Badge badgeContent={notifications.length} color="error">
                      <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Menu /* notifications menu */
                  id="menu-notifications"
                  anchorEl={notificationsAnchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={isNotificationsMenuOpen}
                  onClose={handleMenuClose}
                >
                  <NotificationList maxHeight={400}/>
                </Menu>

                {/* post blog menu options */}
                <IconButton  color="inherit" title='Post a blog'>
                  <Link to='/postblog' className="post-btn"><PostAddIcon /></Link>
                </IconButton>

                {/* profile menu option */}
                <IconButton edge="end" color="inherit" title='Your profile' aria-controls='menu-profile' aria-haspopup="true" onClick={handleProfileMenuOpen}>
                <AccountCircleIcon /> {/* profile should contain a circle with a letter-> containing profile, settings, logout */}
                </IconButton>
                <Menu /* notifications menu */
                  id="menu-profile"
                  anchorEl={profileAnchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={isProfileMenuOpen}
                  onClose={handleMenuClose}
                >
                   <MenuItem onClick={handleMenuClose} key='profile'>
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Link to='/profile' className="profile-btn">Profile</Link>
                    </ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} key='settings'>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Link to='/settings' className="settings-btn">Settings</Link>
                    </ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} key='logout'>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText>
                      {/* <Link to='/logout' className="logout-btn">Logout</Link> */}
                      <div onClick={handlelogout}>
                      Logout
                      </div>
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </div>
            :
              <div className="right-section">
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/signup" className="register-btn">Sign up</Link>
              </div>
          }
        </div>
        :
        <div>
          <IconButton edge="end" color="inherit" aria-label='menu' aria-controls='menu-appbar' aria-haspopup="true" onClick={handleMobileMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
              id="menu-appbar"
              anchorEl={mobileAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={isMobileMenuOpen}
              onClose={handleMenuClose}
            >
              {isloggedin ? (
              <>
                <MenuItem onClick={handleMenuClose} key='notifications'>
                  <ListItemIcon>
                    <Badge badgeContent={notifications.length} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText>
                    <Link to="/notifications" className="notifications-btn">Notifications</Link>
                  </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose} key='post'>
                  <ListItemIcon>
                    <PostAddIcon />
                  </ListItemIcon>
                  <ListItemText>
                  <Link to='/postblog'className="post-btn">Post</Link>
                  </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose} key='profile'>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Link to="/profileMenu" className="profile-btn">Profile Options </Link>
                  </ListItemText>
                </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleMenuClose} key='login'>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to="/login" className="login-btn">Login</Link>
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} key='signup'>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to="/signup" className="signup-btn">Sign up</Link>
                </ListItemText>
              </MenuItem>
            </>
              )}
            </Menu>
        </div>
        }
    </div>
  );
};

export default Navbar;
