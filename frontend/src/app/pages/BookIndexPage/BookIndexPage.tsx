import { Box, Pagination, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookIndex, SearchBar } from 'app/components';
import useBooks from './useBooks';

const TITLE_SEARCH_TERM_PARAM_NAME = 'search-term';

export default function BookIndexPage() {
    const [page, setPage] = useState(1);
    const pageLimit = 10;

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const [titleSearchTerm, setTitleSearchTerm] = useState(searchParams.get(TITLE_SEARCH_TERM_PARAM_NAME) ?? '');

    const { books, pageInfo } = useBooks({ titleSearchTerm }, pageLimit, page);

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
