import { Box, Pagination, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import useAuthors from './UseListAuthors';
import { AuthorIndex } from '../../components';

export default function AuthorIndexPage() {
    const [page, setPage] = useState(1);
    const pageLimit = 10;

    const { authors, totalPages } = useAuthors(pageLimit, page);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Stack gap={4}>
            <Typography variant="h3" component="h1">
                Authors
            </Typography>

            <AuthorIndex authors={authors} />

            <Box display="flex" justifyContent="center" alignItems="center">
                <Pagination count={totalPages} page={page} onChange={handleChange} />
            </Box>
        </Stack>
    );
}
