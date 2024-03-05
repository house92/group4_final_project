import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import AuthorDetails from 'app/components/compounds/AuthorDetails/AuthorDetails';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthor from './UseAuthor';

export default function AuthorPage() {
    const { authorId } = useParams();
    const { author } = useAuthor(authorId);

    const navigate = useNavigate();

    if (!author) {
        // not the most elegant solution, but better than a blank page
        navigate(-1);
        return null;
    }

    return (
        <Stack gap={4}>
            <Typography variant="h3" component="h1">
                {author.name}
            </Typography>

            <AuthorDetails
                birthYear={
                    author.dateOfBirth?.get('year') === 2024 ? 'Unknown' : String(author.dateOfBirth?.get('year'))
                }
                deathYear={
                    author.dateOfDeath?.get('year') === 2024 ? 'Unknown' : String(author.dateOfDeath?.get('year'))
                }
                hometown={author.hometown}
                bio={author.bio}
            />
        </Stack>
    );
}
