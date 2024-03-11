import { BookIndexItem } from 'app/components';
import { Box, Pagination, Typography } from '@mui/material';
import useBooks from './useBooks';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useGetBooksListQuery } from '../../../generated/graphql';

export default function BookIndexPage() {
    const [page, setPage] = useState(1);
    const pageLimit = 10;
   
    const { loading, error, data } = useQuery(useGetBooksListQuery, {
        variables: {
            page: page,
            pageLimit: pageLimit
        }
    });
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const books = data.listBooks.nodes;

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
            <Pagination count={Math.ceil(data.listBooks.totalEdges / pageLimit)} page={page} onChange={handleChange} />
        </Box>
    );
}
