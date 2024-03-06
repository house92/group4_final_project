import React from 'react';
import { Paper, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

interface BookReviewProps {
    title: string;
    bookHref?: string;
    body: string;
    rating: number;
    reviewerName?: string;
    reviewerHref?: string;
}

export default function BookReview({ title, bookHref, body, rating, reviewerName, reviewerHref }: BookReviewProps) {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            {bookHref ? (
                <Typography variant="h5">
                    Title: <Link to={bookHref}>{title}</Link>
                </Typography>
            ) : (
                <Typography variant="h5">Title: {title}</Typography>
            )}

            <Typography variant="body1">Review: {body}</Typography>
            <Rating value={rating} />

            {reviewerName && (
                <Typography variant="body1">
                    Reviewed By: {reviewerHref ? <Link to={reviewerHref}>{reviewerName}</Link> : reviewerName}
                </Typography>
            )}
        </Paper>
    );
}
