import { BookIndexItem } from 'app/components';
import { Box, Pagination, Typography } from '@mui/material';
import useBooks from './useBooks';
import { useState } from 'react';

export default function BookIndexPage() {
    const { books } = useBooks();
    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box>
            <Typography variant="h4"> Book Index</Typography>
            <Box marginBottom={2} />
            {books.map((book) => (
                <BookIndexItem
                    coverImage={book.coverImage}
                    title={book.title}
                    authorNames={book.authorNames}
                    publicationDate={book.publicationDate}
                />
            ))}
            <Pagination count={10} page={page} onChange={handleChange} />
        </Box>
    );
}
