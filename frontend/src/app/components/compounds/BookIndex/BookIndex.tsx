import { ComponentProps } from 'react';
import BookIndexItem from './BookIndexItem';
import { Link } from 'react-router-dom';
import { Paper, Stack } from '@mui/material';

interface Book extends ComponentProps<typeof BookIndexItem> {
    id: string;
}

interface BookIndexProps {
    books: Book[];
}

export default function BookIndex({ books }: BookIndexProps) {
    return (
        <Stack gap={2}>
            {books.map((book) => (
                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <BookIndexItem {...book} />
                    </Link>
                </Paper>
            ))}
        </Stack>
    );
}
