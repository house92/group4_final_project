import { ComponentProps } from 'react';
import AuthorIndexItem from './AuthorIndexItem';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Paper, Stack } from '@mui/material';

interface Author extends Omit<ComponentProps<typeof AuthorIndexItem>, 'birthYear' | 'deathYear'> {
    id: string;
    dateOfBirth?: DateTime;
    dateOfDeath?: DateTime;
}

interface AuthorIndexProps {
    authors: Author[];
}

export default function AuthorIndex({ authors }: AuthorIndexProps) {
    return (
        <Stack gap={2}>
            {authors.map((author) => (
                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Link to={`/authors/${author.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <AuthorIndexItem
                            name={author.name}
                            birthYear={
                                author.dateOfBirth?.get('year') === 2024
                                    ? 'Unknown'
                                    : String(author.dateOfBirth?.get('year'))
                            }
                            deathYear={
                                author.dateOfDeath?.get('year') === 2024
                                    ? 'Unknown'
                                    : String(author.dateOfDeath?.get('year'))
                            }
                        />
                    </Link>
                </Paper>
            ))}
        </Stack>
    );
}
