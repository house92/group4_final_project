import React from 'react';
import { Paper, Typography } from '@mui/material';
import { DateTime } from 'luxon';

interface BookDetailsProps {
    id: string;
    title: string;
    coverImage: string;
    authorName?: string;
    publicationDate: DateTime;
    synopsis: string;
}

const BookDetails = ({ title, coverImage, authorName, publicationDate, synopsis }) => {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">{title}</Typography>
            <img src={coverImage} alt="Book Cover" style={{ maxWidth: '100%', marginBottom: 10 }} />
            <Typography variant="body1">Author: {authorName}</Typography>
            <Typography variant="body1">Publication Date: {publicationDate.toLocaleString(DateTime.DATE_MED)}</Typography>
            <Typography variant="body1">Synopsis: {synopsis}</Typography>
        </Paper>
    );
};

export default BookDetails;
