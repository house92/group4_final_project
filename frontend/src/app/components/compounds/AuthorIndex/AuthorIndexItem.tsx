import { Box, Stack, Typography } from '@mui/material';

interface AuthorIndexItemProps {
    name: string;
    birthYear?: number;
    deathYear?: number;
}

export default function AuthorIndexItem({ name, birthYear, deathYear }: AuthorIndexItemProps) {
    return (
        <Stack gap={2} maxWidth={400}>
            <Typography variant="h5" component="p">
                {name}
            </Typography>

            <Box display="flex" flexDirection="row" gap={2}>
                <Typography variant="body1">Born: {birthYear ?? 'Unknown'}</Typography>

                {deathYear && <Typography variant="body1">Died: {deathYear}</Typography>}
            </Box>
        </Stack>
    );
}
