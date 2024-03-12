import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { BookIndex, SearchBar } from 'app/components';
import useBooks from './useBooks';

const TITLE_SEARCH_TERM_PARAM_NAME = 'search-term';

export default function BookIndexPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [titleSearchTerm, setTitleSearchTerm] = useState(searchParams.get(TITLE_SEARCH_TERM_PARAM_NAME) ?? '');

    const { books } = useBooks({ titleSearchTerm });

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
        </Stack>
    );
}
