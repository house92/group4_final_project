import { Pagination, Stack, Typography } from '@mui/material';

interface AuthorIndexItemProps {
    authorId: string;
    authorName: string;
    birthYear: string;
    hometown: string | null | undefined;
}

export default function AuthorIndexItem({ authorId, authorName, birthYear, hometown }: AuthorIndexItemProps) {
    return (
        <Stack gap={2} maxWidth={260} mb={4}>
            <Typography variant="h5">{authorName}</Typography>
            <Typography variant="body1">{birthYear}</Typography>
            <Typography variant="body1">{hometown}</Typography>
            <Pagination count={10} size="small" />
        </Stack>
    );
}
