import { AuthorIndex } from 'app/components';

import useAuthors from './UseListAuthors';
import { Box, Typography } from '@mui/material';

export default function AuthorIndexPage() {
    const { authors } = useAuthors();

    return (
        <Box>
            <Typography variant="h3" component="h1" mb={4}>
                Authors
            </Typography>

            <AuthorIndex authors={authors} />
        </Box>
    );
}
