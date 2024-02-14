import { BookIndexItem } from 'app/components';
import { Box, Typography } from '@mui/material';
import useBooks from './useBooks';

export default function BookIndexPage() {
    const { books } = useBooks();

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
        </Box>
    );
}
