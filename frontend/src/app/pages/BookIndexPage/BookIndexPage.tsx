import { BookIndex } from 'app/components';
import { Box, Pagination, Typography } from '@mui/material';
import useBooks from './useBooks';
import { useState } from 'react';

export default function BookIndexPage() {
    const [page, setPage] = useState(1);
    const pageLimit = 10;

    const { books, pageInfo } = useBooks(pageLimit, page);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box>
            <Typography variant="h3" component="h1" mb={4}>
                Books
            </Typography>

            <BookIndex books={books} />
            <Pagination count={pageInfo ? pageInfo.totalPages : 1} page={page} onChange={handleChange} />
        </Box>
    );
}
