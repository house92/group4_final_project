import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import { useQuery } from '@apollo/client';
import useBook from './useBook';
import BookDetails from 'app/components/compounds/BookDetails/BookDetails';
import { CircularProgress, Typography, Container } from '@mui/material';

const BookPage = () => {
    const { bookId } = useParams<{ bookId: string}>();
    const { loading, error, data, refetch } = useBook(bookId);

    useEffect(() => {
        refetch();
    }, [bookId, refetch]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography variant="body1">Error: {error.message}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Book Page
            </Typography>
            {data && <BookDetails {...data.book} />}
        </Container>
    );
};

export default BookPage;
