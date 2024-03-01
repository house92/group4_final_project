import { Box, Stack, Typography } from '@mui/material';

interface AuthorIndexItemProps {
    name: string;
    birthYear: number;
    deathYear?: number;
    hometown: string | undefined;
}

export default function AuthorIndexItem({ name, birthYear, deathYear, hometown }: AuthorIndexItemProps) {
    return (
        <Stack gap={2} maxWidth={400}>
            <Typography variant="h5" component="p">
                {name}
            </Typography>

            <Box display="flex" flexDirection="row" gap={2}>
                <Typography variant="body1">Born: {birthYear}</Typography>

                {deathYear && <Typography variant="body1">Died: {deathYear}</Typography>}
            </Box>

            {hometown && <Typography variant="body1">{hometown}</Typography>}
        </Stack>
    );
}
