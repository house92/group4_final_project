import { Box, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

interface BookDetailsProps {
    title?: string;
    coverImage: string;
    authors: { name: string; id: string }[];
    publicationDate?: DateTime;
    synopsis?: string;
}

export default function BookDetails({ title, coverImage, authors, publicationDate, synopsis }: BookDetailsProps) {
    return (
        <Box display="flex" flexDirection="row" gap={2}>
            <img src={coverImage} alt="Book Cover" style={{ maxWidth: '100%', marginBottom: 10 }} />

            <Stack gap={2}>
                {title && <Typography variant="h5">{title}</Typography>}

                <Typography variant="body1">
                    Authors:{' '}
                    {authors.map((author) => (
                        <Link to={`/authors/${author.id}`}>{author.name}</Link>
                    ))}
                </Typography>

                <Typography variant="body1">
                    Publication Date: {publicationDate ? publicationDate.toLocaleString(DateTime.DATE_MED) : 'Unknown'}
                </Typography>

                {synopsis && <Typography variant="body1">{synopsis}</Typography>}
            </Stack>
        </Box>
    );
}
