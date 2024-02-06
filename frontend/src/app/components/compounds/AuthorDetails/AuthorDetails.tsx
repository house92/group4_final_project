import React from 'react';
import { Paper, Typography } from '@mui/material';

interface AuthorDetailsProps {
    authorName: string;
    birthYear: number;
    homeTown: string;
    bio: string;
}

const AuthorDetails = ({ firstName, lastName, dateOfBirth, homeTown, bio }) => {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">Author: {authorName}</Typography>
            <Typography variant="body1">Date Of Birth: {birthYear}</Typography>
            <Typography variant="body1">Home Town: {homeTown}</Typography>
            <Typography variant="body1">Bio: {bio}</Typography>
        </Paper>
    );
};

export default AuthorDetails;