import React, {useContext} from "react";
import { List, ListItem, Card, CardContent, Box,  ListItemIcon, ListItemText, Typography,} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import WindowWidthTracker from "../../utils/windowwidth";
import { Navigate, Link } from "react-router-dom";
import './ProfileMenuPage.css'
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../utils/loginContext";


const ProfileMenuPage = () => {
    const { windowWidth } = WindowWidthTracker();
    const { logout } = useLogin();
    const navigate = useNavigate()

    const handlelogout = () => {
        logout()
        navigate('/')
    }

    return (
        <>
        {windowWidth < 768 ? 
            <List style={{height: 'auto', marginLeft: '30%', padding: 0, width:'100%'}}>
                <ListItem key={1} disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center', width:'100%', margin:'0', padding:'0' }}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            <Link to='/profile' className="profile-menu-option link">
                                <AccountCircleIcon sx={{ mr: 2}} />
                                Profile
                            </Link>
                        </Typography>
                    </Box>
                </ListItem>
                <ListItem key={2} disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center', width:'100%', margin:'0', padding:'0'}}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            <Link to='/settings' className="settings-menu-option link">
                                <SettingsIcon sx={{ mr: 2 }}/>
                                Settings
                            </Link>
                        </Typography>
                    </Box>
                </ListItem>
                <ListItem key={3} disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center', width:'100%',margin:'0', padding:'0' }}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            <div onClick={handlelogout}>
                                <Link className="link">
                                <ExitToAppIcon sx={{ mr: 2 }}/>
                                Logout
                                </Link>
                            </div>
                        </Typography>
                    </Box>
                </ListItem>
            </List>
            : 
            <Navigate to="/" />
        }
        </>
    );
}

export default ProfileMenuPage;