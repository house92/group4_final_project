import React from 'react';
import { Box, Typography } from '@mui/material';
import BookDetails from 'app/components/compounds/BookDetails/BookDetails';
import { useParams } from 'react-router-dom';
import useBook from './useBook';

export default function BookPage() {
    const { bookId } = useParams();
    const { book } = useBook(bookId);

    return (
        <Box>
            <Typography variant="h4">Book</Typography>
            <Box marginBottom="20px" />
            {book && (
                <BookDetails
                    id={book.id}
                    title={book.title}
                    coverImage={book.coverImage}
                    authorNames={book.authorNames}
                    publicationDate={book.publicationDate}
                    synopsis={book.synopsis ?? ''}
                />
            )}
        </Box>
    );
}
