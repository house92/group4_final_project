import React from 'react';
import { Paper, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
//import BookReview from './app/components/compounds/BookReview/BookReview';

interface BookReviewDetailsProps {
    title: string;
    review: string;
    rating: string;
    reviewerName?: string[];
}

export default function BookReviewDetails({ title, review, rating, reviewerName }: BookReviewDetailsProps) {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">Title: {title}</Typography>
            <Typography variant="body1">Review: {review}</Typography>
            <Typography variant="body1">Rating: {rating}</Typography>
            {reviewerName && reviewerName.length > 0 && (
                <Typography variant="body1">Reviewed By: {reviewerName}</Typography>
            )}
        </Paper>
    );
}
