import { Box, Stack, Pagination, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { BookIndex, SearchBar } from 'app/components';
import useBooks from './useBooks';
import { useState } from 'react';

const TITLE_SEARCH_TERM_PARAM_NAME = 'search-term';

export default function BookIndexPage() {
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageLimit = 10;
    const [titleSearchTerm, setTitleSearchTerm] = useState(searchParams.get(TITLE_SEARCH_TERM_PARAM_NAME) ?? '');

    const { books, pageInfo } = useBooks({titleSearchTerm}, pageLimit, page );
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Stack gap={4}>
            <Typography variant="h3" component="h1">
                Books
            </Typography>

            <SearchBar
                initialValue={titleSearchTerm}
                onSubmit={(newTitleSearchTerm) => {
                    setTitleSearchTerm(newTitleSearchTerm);

                    const newSearchParams = new URLSearchParams(searchParams);
                    newSearchParams.set(TITLE_SEARCH_TERM_PARAM_NAME, newTitleSearchTerm);
                    setSearchParams(newSearchParams);
                }}
            />

            <BookIndex books={books} />
            <Pagination count={pageInfo ? pageInfo.totalPages : 1} page={page} onChange={handleChange} />
        </Stack>
    );
}
