import React from 'react';
import { Paper, Typography } from '@mui/material';

interface Friend {
    name: string;
}

interface FriendsIndexItemProps {
    friends: Friend[];
}

export default function FriendIndexItem({ name }: Friend) {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">Name: {name}</Typography>
        </Paper>
    );
}
