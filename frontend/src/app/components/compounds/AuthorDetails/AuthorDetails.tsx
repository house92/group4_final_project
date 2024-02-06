import React from 'react';
import { Paper, Typography } from '@mui/material';

interface AuthorDetailsProps {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    homeTown: string;
    bio: string;
}

const AuthorDetails = ({ firstName, lastName, dateOfBirth, homeTown, bio }) => {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">Author: {firstName + lastName}</Typography>
            <Typography variant="body1">Date Of Birth: {dateOfBirth}</Typography>
            <Typography variant="body1">Home Town: {homeTown}</Typography>
            <Typography variant="body1">Bio: {bio}</Typography>
        </Paper>
    );
};

export default AuthorDetails;