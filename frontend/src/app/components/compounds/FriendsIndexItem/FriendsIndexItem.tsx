import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface Friend {
    name: string;
}

interface FriendsIndexItemProps {
    friends: Friend[];
}

const FriendsIndexItem = ({ name }: Friend) => {
        return (
            <Paper variant="outlined" style={{ padding: 20 }}>
                <Typography variant="h5">Name: {name}</Typography>
            </Paper>
        );
};

export default FriendsIndexItem;