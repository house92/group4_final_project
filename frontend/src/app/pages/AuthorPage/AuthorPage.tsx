import React from 'react';
import { Box, Typography } from '@mui/material';
import AuthorDetails from 'app/components/compounds/AuthorDetails/AuthorDetails';
import { useParams } from 'react-router-dom';
import useAuthor from './UseAuthor';

export default function AuthorPage() {
    const { authorId } = useParams();
    const { author } = useAuthor(authorId);

    return (
        <Box>
            <Typography variant="h4">Author</Typography>
            <Box marginBottom="20px" />
            <AuthorDetails
                name={author?.name}
                birthYear={author?.dateOfBirth}
                homeTown={author?.hometown}
                bio={author?.bio}
            />
        </Box>
    );
}