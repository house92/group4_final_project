import { BookIndex } from 'app/components';
import { Box, Typography } from '@mui/material';
import useBooks from './useBooks';

export default function BookIndexPage() {
    const { books } = useBooks();

    return (
        <Box>
            <Typography variant="h3" component="h1" mb={4}>
                Books
            </Typography>

            <BookIndex books={books} />
        </Box>
    );
}
