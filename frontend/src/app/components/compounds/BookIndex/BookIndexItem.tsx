import { Box, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { Image } from 'mui-image';

interface BookIndexItemProps {
    coverImage: string;
    title: string;
    authorNames: string[];
    publicationDate?: DateTime;
}

export default function BookIndexItem({ coverImage, title, authorNames, publicationDate }: BookIndexItemProps) {
    return (
        <Box display="flex" flexDirection="row" gap={2}>
            <Image src={coverImage} alt={`${title} book cover`} />
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
