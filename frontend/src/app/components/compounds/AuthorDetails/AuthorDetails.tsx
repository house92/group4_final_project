import React from 'react';
import { Box, Paper, Rating, Stack, Typography } from '@mui/material';

interface AuthorDetailsProps {
    name?: string;
    birthYear?: string;
    deathYear?: string;
    hometown?: string;
    bio?: string;
    rating?: number;
}

const AuthorDetails = ({ name, birthYear, deathYear, hometown, bio, rating }: AuthorDetailsProps) => {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            {name && <Typography variant="h5">Author: {name}</Typography>}

            <Box display="flex" flexDirection="row" gap={2}>
                {birthYear && <Typography variant="body1">Born: {birthYear}</Typography>}

                {deathYear && <Typography variant="body1">Died: {deathYear}</Typography>}
            </Box>

            {hometown && <Typography variant="body1">Home Town: {hometown}</Typography>}

            {bio && <Typography variant="body1">Bio: {bio}</Typography>}

            <Stack>
                {rating !== 0 ? (
                    <>
                        <Typography variant="body1">Rating: {rating}</Typography>
                        <Rating name="read-only" value={rating} readOnly />
                    </>
                ) : (
                    <Typography variant="body1">No Ratings</Typography>
                )}
            </Stack>
        </Paper>
    );
};

export default AuthorDetails;
