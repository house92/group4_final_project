import { Pagination, Paper, Typography } from '@mui/material';
import { DateTime } from 'luxon';

interface BookIndexItemProps {
    coverImage: string;
    title: string;
    authorNames: string[];
    publicationDate?: DateTime;
}

export default function BookIndexItem({ coverImage, title, authorNames, publicationDate }: BookIndexItemProps) {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <img src={coverImage} alt="Book Cover" style={{ maxWidth: '100%', marginBottom: 10 }} />
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1">Authors: {authorNames.join(', ')}</Typography>

            {publicationDate && (
                <Typography variant="body1">
                    Publication Date: {publicationDate.toLocaleString(DateTime.DATETIME_SHORT)}
                </Typography>
            )}
            <Pagination count={10} size="small" />
        </Paper>
    );
}
