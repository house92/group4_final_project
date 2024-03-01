import { Box, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';

interface BookIndexItemProps {
    coverImage: string;
    title: string;
    authorNames: string[];
    publicationDate?: DateTime;
}

export default function BookIndexItem({ coverImage, title, authorNames, publicationDate }: BookIndexItemProps) {
    return (
        <Box display="flex" flexDirection="row" gap={2}>
            <img src={coverImage} alt={`${title} book cover`} style={{ maxWidth: '100%', marginBottom: 10 }} />

            <Stack gap={2} maxWidth={400}>
                <Typography variant="h5" component="p">
                    {title}
                </Typography>
                <Typography variant="body1">Authors: {authorNames.join(', ')}</Typography>

                {publicationDate && (
                    <Typography variant="body1">
                        Publication Date: {publicationDate.toLocaleString(DateTime.DATETIME_SHORT)}
                    </Typography>
                )}
            </Stack>
        </Box>
    );
}
