import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import BookReviewForm from '../BookReviewForm';
import React from 'react';

export default {
    title: 'Compounds/BookReview',
    component: BookReviewForm,
};

const handleSubmit = (BookReviewProps) => {
    console.log('Form submitted with data:', BookReviewProps);
};

export const Basic = (args) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={9} lg={6}>
                <Paper variant="outlined" sx={{ p: 4, background: '#ffffee' }}>
                    <BookReviewForm onSubmit={handleSubmit} title={'Leave a Review'} />
                </Paper>
            </Grid>
        </Grid>
    );
};
