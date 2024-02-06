import React from 'react';
import { Paper, Typography } from '@mui/material';

interface BookDetailsProps {
    title: string;
    coverImage: string;
    authorName?: string;
    publicationDate: string;
    synopsis: string;
}

const BookDetails = ({ title, coverImage, authorName, publicationDate, synopsis }) => {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">{title}</Typography>
            <img src={coverImage} alt="Book Cover" style={{ maxWidth: '100%', marginBottom: 10 }} />
            <Typography variant="body1">Author: {authorName}</Typography>
            <Typography variant="body1">Publication Date: {publicationDate}</Typography>
            <Typography variant="body1">Synopsis: {synopsis}</Typography>
        </Paper>
    );
};

export default BookDetails;
