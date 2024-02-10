import React from 'react';
import { Paper, Typography } from '@mui/material';

interface AuthorDetailsProps {
    name: string;
    birthYear: number;
    homeTown: string;
    bio: string;
}

const AuthorDetails = ({ name, birthYear, homeTown, bio }) => {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">Author: {name}</Typography>
            <Typography variant="body1">Date Of Birth: {birthYear}</Typography>
            <Typography variant="body1">Home Town: {homeTown}</Typography>
            <Typography variant="body1">Bio: {bio}</Typography>
        </Paper>
    );
};

export default AuthorDetails;