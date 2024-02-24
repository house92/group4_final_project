import React from 'react';
import { Paper, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';

interface BookReviewProps {
    title: string;
    body: string;
    rating: number;
    reviewerName?: string;
}

export default function BookReview({ title, body, rating, reviewerName }: BookReviewProps) {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">Title: {title}</Typography>
            <Typography variant="body1">Review: {body}</Typography>
            <Rating value={rating} />
            {reviewerName && <Typography variant="body1">Reviewed By: {reviewerName}</Typography>}
        </Paper>
    );
}
