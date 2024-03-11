import React from 'react';
import { Box, Paper, Rating, Stack, Typography } from '@mui/material';

interface AuthorDetailsProps {
    name?: string;
    birthYear?: number;
    deathYear?: number;
    hometown?: string;
    bio?: string;
    rating?: number;
}

const AuthorDetails = ({ name, birthYear, deathYear, hometown, bio, rating }: AuthorDetailsProps) => {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            {name && <Typography variant="h5">Author: {name}</Typography>}

            <Box display="flex" flexDirection="row" gap={2}>
                <Typography variant="body1">Born: {birthYear ?? 'Unknown'}</Typography>

                {deathYear && <Typography variant="body1">Died: {deathYear}</Typography>}
            </Box>

            {hometown && <Typography variant="body1">Home Town: {hometown}</Typography>}

            {bio && <Typography variant="body1">Bio: {bio}</Typography>}

            <Stack>
                {rating && <Typography variant="body1"> Rating: {rating}</Typography>}
                <Rating name="read-only" value={rating} readOnly />
            </Stack>
        </Paper>
    );
};

export default AuthorDetails;
