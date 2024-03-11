import { BookIndex, SearchBar } from 'app/components';
import { Stack, Typography } from '@mui/material';
import useBooks from './useBooks';
import { useState } from 'react';

export default function BookIndexPage() {
    const [titleSearchTerm, setTitleSearchTerm] = useState('');

    const { books } = useBooks({ titleSearchTerm });

    return (
        <Stack gap={4}>
            <Typography variant="h3" component="h1">
                Books
            </Typography>

            <SearchBar
                initialValue={titleSearchTerm}
                onSubmit={(newTitleSearchTerm) => setTitleSearchTerm(newTitleSearchTerm)}
            />

            <BookIndex books={books} />
        </Stack>
    );
}
