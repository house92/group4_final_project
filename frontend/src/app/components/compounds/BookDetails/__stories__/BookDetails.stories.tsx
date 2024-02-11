import React from 'react';
import { Paper, Typography } from '@mui/material';
import BookDetails from '../BookDetails';

export default {
    title: 'Compounds/BookDetails',
};

export const Default = () => (
    <BookDetails
        title="Book Title"
        coverImage="Cover Image URL"
        authorName="John Doe"
        publicationDate="2024-01-01"
        synopsis="This is the books synopsis... 123"
    />
);
