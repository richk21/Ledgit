import React from 'react';
import { List, ListItem, Card, CardContent, Avatar, Box, Typography } from '@mui/material';
import notifications from './NotificationData';

const NotificationList = ({ maxHeight }) => {
    return (
        <div style={{ maxHeight: `${maxHeight}px`, overflowY: 'auto' }}> {/* maxheight set only in navbar dropdown */}
            <List style={{height: 'auto', margin: 0, padding: 0}}>
                {notifications.map((notification) => (
                    <ListItem key={notification.id} disableGutters>
                        <Card sx={{ width: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: '#28822F', mr: 2 }}>
                                        {notification.title.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant={maxHeight ? 'h10' : 'h6'} component="div">
                                            {notification.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {notification.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default NotificationList;
