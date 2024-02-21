import React from 'react';
import { Paper, Typography } from '@mui/material';

interface FriendsDetailsProps {
    name: string;
}

const FriendsDetails = ({ name, profilePic, bio }) => {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">Name: {name}</Typography>
        </Paper>
    );
};

export default FriendsDetails;