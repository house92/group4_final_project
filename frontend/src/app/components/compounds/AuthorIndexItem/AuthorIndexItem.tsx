import { Box, Button, Stack, Typography } from '@mui/material';

interface AuthorIndexItemProps {
    authorId: string;
    authorName: string;
    birthYear: number;
    hometown: string;
}

export default function AuthorIndexItem({ authorId, authorName, birthYear, hometown }: AuthorIndexItemProps) {
    return (
        <Stack gap={4}>
            <Stack component="form" gap={4} maxWidth={260}>
                <Typography variant="h5">{authorName}</Typography>
                <Typography variant="body1">{birthYear}</Typography>
                <Typography variant="body1">{hometown}</Typography>
            </Stack>
        </Stack>
    );
}
