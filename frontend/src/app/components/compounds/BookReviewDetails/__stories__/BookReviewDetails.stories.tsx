import React from 'react';
import { Paper, Typography } from '@mui/material';
import BookReviewDetails from '../BookReviewDetails';

export default {
    title: 'Compounds/BookReviewDetails',
};

export const Default = () => (
    <BookReviewDetails
        title="Happy Feet"
        review="This book has lots of penguins"
        rating="5/5"
        reviewerName={['The Penguin']}
    />
);
