import React from 'react';
import { Container, Typography } from '@mui/material';
import NotificationList from '../../Components/NotificationList/NotificationList';
import WindowWidthTracker from '../../utils/windowwidth';
import { Navigate } from 'react-router-dom';

const NotificationPage = () => {
    const { windowWidth } = WindowWidthTracker();

    return (
        <Container maxWidth="sm" sx={{ py: 3 }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Notifications
            </Typography>
            {windowWidth < 768 ? <NotificationList /> : <Navigate to="/" />}
        </Container>
    );
}

export default NotificationPage;
