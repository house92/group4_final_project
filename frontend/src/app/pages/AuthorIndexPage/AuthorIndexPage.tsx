import { Box, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import useAuthors from './UseListAuthors';
import { AuthorIndex } from '../../components';

export default function AuthorIndexPage() {
    const [page, setPage] = useState(1);
    const pageLimit = 10;

    const { authors } = useAuthors(pageLimit, page);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box>
            <Typography variant="h3" component="h1" mb={4}>
                Authors
            </Typography>

            <AuthorIndex authors={authors} />
            <Pagination count={Math.ceil(authors.length / pageLimit)} page={page} onChange={handleChange} />
        </Box>
    );
}
