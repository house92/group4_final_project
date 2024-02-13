import React from 'react';
import { Paper, Typography } from '@mui/material';

interface UserDetailsProps {
    id: string;
    name: string;
    bio: string;
    age: string;
}

const UserDetails = ({ id, name, bio, age }) => {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">{id}</Typography>
            <Typography variant="body1">Name: {name}</Typography>
            <Typography variant="body1">Bio: {bio}</Typography>
            <Typography variant="body1">Age: {age}</Typography>
        </Paper>
    );
};

export default UserDetails;