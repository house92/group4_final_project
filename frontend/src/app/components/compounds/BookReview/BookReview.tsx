import React from 'react';
import { Paper, Stack, Typography } from '@mui/material';
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
        <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack gap={1}>
                {bookHref ? (
                    <Typography variant="h5">
                        <Link to={bookHref}>{title}</Link>
                    </Typography>
                ) : (
                    <Typography variant="h5">{title}</Typography>
                )}

                <Rating name="read-only" value={rating} readOnly />

                <Typography variant="body1">{body}</Typography>

                {reviewerName && (
                    <Typography variant="body2">
                        Reviewed By: {reviewerHref ? <Link to={reviewerHref}>{reviewerName}</Link> : reviewerName}
                    </Typography>
                )}
            </Stack>
        </Paper>
    );
}
