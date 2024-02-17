import React from 'react';
import { Paper, Typography } from '@mui/material';

interface FriendsDetailsProps {
    name: string;
    profilePic: string;
    bio: string;
}

const FriendsDetails = ({ name, profilePic, bio }) => {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">Name: {name}</Typography>
            <img src={profilePic} alt="Profile Picture:" style={{ maxWidth: '100%', marginBottom: 10 }} />
            <Typography variant="body1">Bio: {bio}</Typography>
        </Paper>
    );
};

export default FriendsDetails;