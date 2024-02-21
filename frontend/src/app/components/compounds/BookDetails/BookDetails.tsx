import React from 'react';
import { Paper, Typography } from '@mui/material';
import { DateTime } from 'luxon';

interface BookDetailsProps {
    id: string;
    title: string;
    coverImage: string;
    authorNames: string[] | undefined;
    publicationDate: DateTime | undefined;
    synopsis: string;
}

export default function BookDetails({ title, coverImage, authorNames, publicationDate, synopsis }: BookDetailsProps) {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">{title}</Typography>
            <img src={coverImage} alt="Book Cover" style={{ maxWidth: '100%', marginBottom: 10 }} />
            <Typography variant="body1">Author: {authorNames?.join(', ')}</Typography>
            <Typography variant="body1">
                Publication Date: {publicationDate ? publicationDate.toLocaleString(DateTime.DATE_MED) : 'Unknown'}
            </Typography>
            <Typography variant="body1">Synopsis: {synopsis}</Typography>
        </Paper>
    );
}
