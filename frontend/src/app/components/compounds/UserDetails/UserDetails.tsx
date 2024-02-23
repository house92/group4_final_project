import React from 'react';
import { Paper, Typography } from '@mui/material';
import { DateTime } from 'luxon';

interface UserDetailsProps {
    name: string;
    bio: string | null | undefined;
    age: number;
}

export default function UserDetails({ name, bio, age }: UserDetailsProps) {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="body1">Name: {name}</Typography>
            <Typography variant="body1">Bio: {bio}</Typography>
            <Typography variant="body1">Age: {age}</Typography>
        </Paper>
    );
};
