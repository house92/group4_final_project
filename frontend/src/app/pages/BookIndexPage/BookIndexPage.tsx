import BookIndexItem from 'app/components/compounds/AuthorIndexItem';
import { Box, Typography } from'@mui/material';
import { useParams } from 'react-router-dom';
import useBooks from './UseListBooks';

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
                    author={book.author}
                    publicationYear={book.publicationYear}
                />
            ))}
        </Box>
    );
}
