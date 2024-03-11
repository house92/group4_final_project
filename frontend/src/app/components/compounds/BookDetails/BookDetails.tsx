import { Box, Rating, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

interface BookDetailsProps {
    title?: string;
    coverImage: string;
    authors: { name: string; id: string }[];
    publicationDate?: DateTime;
    rating?: number;
    synopsis?: string;
}

export default function BookDetails({ title, coverImage, authors, publicationDate, rating, synopsis }: BookDetailsProps) {
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
                <Typography variant="body1">Rating: {rating?.toFixed(2)}</Typography>
                <Rating name="read-only" value={rating} readOnly />

                {synopsis && <Typography variant="body1">{synopsis}</Typography>}
            </Stack>
        </Box>
    );
}
